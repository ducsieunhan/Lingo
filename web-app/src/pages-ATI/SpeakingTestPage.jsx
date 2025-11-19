import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FinishedScreen } from "../components-ATI/speaking/FinishedScreen";
import SpeakingHeader from "../components-ATI/speaking/SpeakingHeader";
import SpeakingFooter from "../components-ATI/speaking/SpeakingFooter";
import { useDispatch, useSelector } from "react-redux";
import { saveSingleFile } from "../slice/files";
import { createSubmit } from "../slice-ATI/speaking";
import { createAttempts } from "../slice/attempts";
import { toast } from "react-toastify";
import { retrieveQuestionForTest } from "../slice/questions";


function SpeakingTestPage() {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);

  const isLockMode = !!testId;

  // (1. Dữ liệu gốc từ Redux)
  const {
    questions: fetchedQuestions,
    loading: pageLoading,
    error
  } = useSelector((state) => state.questions);

  // (2. Bộ xử lí: Biến đổi 'fetchedQuestions' thành 'processedQuestions')
  const processedQuestions = useMemo(() => {
    if (!fetchedQuestions) return [];

    // Dùng flatMap để biến mảng [Part 1, Part 2, Part 3]
    // thành mảng [Part 1 Topic, Q1, Q2, ..., Part 2, Part 3 Q1, Q2, ...]
    return fetchedQuestions.flatMap(q => {
      // Tách 'title' thành các dòng, lọc bỏ dòng trống
      const lines = q.title.split(/[\r\n]+/).filter(line => line.trim() !== '');
      if (lines.length === 0) return []; // Bỏ qua nếu câu hỏi rỗng

      // Part 2 (Cue Card): Luôn là 1 slide duy nhất.
      if (q.part === 'Part 2') {
        // Trả về một mảng chứa 1 slide
        return [{
          ...q,
          title: q.title, // Giữ nguyên title đầy đủ
          isTopic: false, // Đây là câu hỏi, không phải chủ đề
          originalId: q.id // Giữ ID gốc của câu hỏi CSDL
        }];
      }

      // Part 1: Có 1 slide Topic + nhiều slide Câu hỏi
      if (q.part === 'Part 1') {
        // Dòng đầu tiên (ví dụ: "Fruit") là Topic
        const topicSlide = {
          ...q,
          title: lines[0], // Dòng đầu tiên là chủ đề
          isTopic: true, // Đánh dấu là slide Topic
          originalId: q.id
        };

        // Các dòng còn lại là câu hỏi
        const questionSlides = lines.slice(1).map(line => ({
          ...q,
          title: line, // Mỗi dòng là một câu hỏi
          isTopic: false,
          originalId: q.id
        }));

        // Trả về [Topic, Q1, Q2, ...]
        return [topicSlide, ...questionSlides];
      }

      // Part 3: Chỉ có các slide Câu hỏi
      if (q.part === 'Part 3') {
        // Tất cả các dòng đều là câu hỏi
        return lines.map(line => ({
          ...q,
          title: line,
          isTopic: false,
          originalId: q.id
        }));
      }

      return []; // Bỏ qua nếu part không xác định
    });

  }, [fetchedQuestions]); // Chỉ chạy lại khi fetchedQuestions thay đổi

  const quizId = useMemo(() => (isLockMode ? parseInt(testId, 10) : 24), [isLockMode, testId]); // Mặc định 24

  // (3. Cập nhật topicPrompt để lấy từ dữ liệu thật)
  const topicPrompt = useMemo(() => {
    if (fetchedQuestions && fetchedQuestions.length > 0) {
      const part1 = fetchedQuestions.find(q => q.part === 'Part 1');
      if (part1) {
        // Lấy dòng đầu tiên của Part 1 (ví dụ: "Fruit") làm chủ đề
        const topic = part1.title.split(/[\r\n]+/)[0].trim();
        if (topic) return topic;
      }
    }
    // Fallback
    return isLockMode ? `IELTS Speaking Test #${testId}` : "IELTS Speaking Free Practice";
  }, [isLockMode, testId, fetchedQuestions]); // Thêm fetchedQuestions


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [finalRecording, setFinalRecording] = useState({ audioUrl: null, blob: null });
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const recordedChunksRef = useRef([]);

  useEffect(() => {
    const idToFetch = testId || "24"; // Mặc định fetch test 24 (nơi có data mẫu)

    dispatch(retrieveQuestionForTest(idToFetch))
      .unwrap()
      .catch((err) => {
        console.error("Không tìm thấy bài test:", err);
        toast.error("Không tìm thấy bài test!");
      });

  }, [testId, dispatch]);

  useEffect(() => {
    if (recordingStatus === "recording") {
      timerIntervalRef.current = setInterval(() => {
        setTotalElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [recordingStatus]);

  useEffect(() => {
    return () => {
      stopMediaStream();
      clearInterval(timerIntervalRef.current);
    };
  }, []);


  const stopMediaStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async () => {
    // ... (logic không đổi)
    if (recordingStatus === "paused" && mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordingStatus("recording");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      recordedChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.start();
      setRecordingStatus("recording");
    } catch (err) {
      console.error("Lỗi khi truy cập micro:", err);
      toast.error("Không thể truy cập micro. Vui lòng cấp quyền.");
    }
  };

  const pauseRecording = () => {
    // ... (logic không đổi)
    if (mediaRecorderRef.current && recordingStatus === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingStatus("paused");
    }
  };


  const handleToggleRecordPause = () => {
    // ... (logic không đổi)
    if (isFinished) return;
    if (recordingStatus === "recording") {
      pauseRecording();
    } else {
      startRecording();
    }
  };

  let handleNextQuestion = () => { };

  const handleFinishTest = () => {
    // ... (logic không đổi)
    if (isFinished) return;
    clearInterval(timerIntervalRef.current);
    if (recordingStatus === "idle" && recordedChunksRef.current.length === 0) {
      setFinalRecording({ audioUrl: null, blob: null });
      setIsFinished(true);
      stopMediaStream();
      return;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(blob);
        setFinalRecording({ audioUrl, blob });
        recordedChunksRef.current = [];
        setIsFinished(true);
        stopMediaStream();
        setRecordingStatus("idle");
      };
      if (recordingStatus !== "idle") {
        mediaRecorderRef.current.stop();
      }
    } else {
      setIsFinished(true);
    }
  };

  const handleClose = () => {
    // ... (logic không đổi)
    if (!isFinished && recordingStatus !== "idle") {
      if (!window.confirm("Bạn có chắc muốn thoát? Toàn bộ tiến trình sẽ bị mất.")) {
        return;
      }
    }
    stopMediaStream();
    navigate("/");
  };

  const formatTime = (timeInSeconds) => {
    // ... (logic không đổi)
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleSubmitForGrading = async () => {
    const userId = user?.sub;

    if (!finalRecording.blob) {
      toast.warn("Không tìm thấy file ghi âm.");
      return;
    }
    setIsSubmitting(true);
    toast.info("Đang nộp bài, vui lòng chờ...");

    try {
      const uploadAction = await dispatch(
        saveSingleFile({
          file: finalRecording.blob,
          testTitle: topicPrompt, // Dùng topicPrompt (ví dụ: "Fruit")
          fileCategory: "SPEAKING",
        })
      );
      if (!saveSingleFile.fulfilled.match(uploadAction)) {
        throw new Error(uploadAction.payload || "Lỗi khi tải file lên Cloud.");
      }
      const audioUrl = uploadAction.payload?.mediaUrl;
      console.log("File đã tải lên Cloud:", audioUrl);

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("topic_prompt", topicPrompt); // Dùng topicPrompt
      formData.append("audio", finalRecording.blob, "speaking_test.webm");

      const submitAction = await dispatch(createSubmit(formData));
      if (!createSubmit.fulfilled.match(submitAction)) {
        throw new Error(submitAction.payload || "Lỗi khi nộp bài cho AI!");
      }
      const gradingId = submitAction.payload?.submission_id;
      console.log("Đã nộp cho AI, gradingId:", gradingId);

      // (4. Cập nhật attemptData để dùng ID câu hỏi Part 1)
      const part1QuestionId = fetchedQuestions.find(q => q.part === 'Part 1')?.id || 0;

      const attemptData = {
        quizId: quizId,
        userId: userId,
        timeTaken: totalElapsedTime,
        type: "IELTS",
        field: ["Speaking"],
        gradingIeltsId: gradingId,
        answers: [
          // Gán câu trả lời (audio) cho ID của câu hỏi Part 1
          { questionId: part1QuestionId, userAnswer: audioUrl }
        ]
      };

      const createAttemptAction = await dispatch(createAttempts(attemptData));
      if (!createAttempts.fulfilled.match(createAttemptAction)) {
        throw new Error(createAttemptAction.payload || "Lỗi khi lưu bài làm!");
      }

      const newAttempt = createAttemptAction.payload;
      const newAttemptId = newAttempt;

      if (!newAttemptId) {
        console.error("Payload của createAttempts không có ID:", newAttempt);
        throw new Error("Không lấy được ID bài làm sau khi tạo.");
      }

      console.log("Đã tạo attempt thành công, ID:", newAttemptId);
      toast.success("Nộp bài thành công! Đang chuyển trang kết quả.");

      navigate(`/speaking-result/${newAttemptId}`);

    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
      toast.error(`Đã xảy ra lỗi: ${error.message}`);
      setIsSubmitting(false);
    }
  };


  if (pageLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-semibold">Đang tải bài thi...</h1>
      </div>
    );
  }

  // (5. Cập nhật logic kiểm tra lỗi để dùng 'processedQuestions')
  if (error || !processedQuestions || processedQuestions.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-semibold text-red-600">Lỗi</h1>
          <p className="mt-2">
            {error ? (typeof error === 'object' ? error.message : error) : `Không tìm thấy câu hỏi cho bài thi: ${testId || 24}.`}
          </p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // (6. Cập nhật các biến UI để dùng 'processedQuestions')
  const TOTAL_QUESTIONS = processedQuestions.length;
  const currentQuestion = processedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  handleNextQuestion = () => {
    const isLast = currentQuestionIndex === TOTAL_QUESTIONS - 1;
    if (isLast) {
      handleFinishTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black font-sans">
      <SpeakingHeader {...{ isFinished, TOTAL_QUESTIONS, currentQuestionIndex, totalElapsedTime, formatTime, handleClose }} />

      <main className="flex-1 flex items-center justify-center p-8">
        {!isFinished ? (
          <div className="text-center">
            {/* (7. Cập nhật UI để dùng cờ 'isTopic') */}
            <span className="text-sm font-semibold text-blue-600 uppercase">
              {currentQuestion.part}
              {/* Nếu là slide chủ đề, thêm chữ "TOPIC" */}
              {currentQuestion.isTopic && " - TOPIC"}
            </span>
            {/* Nếu là slide chủ đề, đổi màu chữ cho nổi bật */}
            <h1 className={`text-3xl md:text-4xl font-semibold mt-4 whitespace-pre-line max-w-3xl ${currentQuestion.isTopic ? 'text-indigo-700' : 'text-gray-900'
              }`}>
              {currentQuestion.title}
            </h1>
          </div>
        ) : (
          <FinishedScreen
            recording={finalRecording}
            onSubmit={handleSubmitForGrading}
            isSubmitting={isSubmitting}
          />
        )}
      </main>

      <SpeakingFooter {...{ handleToggleRecordPause, isFinished, recordingStatus, handleNextQuestion, isLastQuestion }} />
    </div>
  );
}

export default SpeakingTestPage;