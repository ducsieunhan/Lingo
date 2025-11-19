import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WritingDisplayPanel from "../components-ATI/writing/WritingDisplayPanel";
import WritingAnalysisPanel from "../components-ATI/writing/WritingAnalysisPanel";
import { retrieveAttempt, updateAttempt } from "../slice/attempts";
// (Import action 'setWritingResult' mới)
import { createSubmit, resetWritingResult, setWritingResult } from "../slice-ATI/writing";
import { retrieveQuestionForTest } from "../slice/questions";

export default function WritingResultPage() {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const [promptImageUrl, setPromptImageUrl] = useState(null);
  // (Đổi tên cờ: cờ này có nghĩa là "Đã xử lý xong")
  const [isProcessed, setIsProcessed] = useState(false);

  const { id: attemptId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const taskFromState = location.state?.task;
  const essayFromState = location.state?.essay;
  const imageFromState = location.state?.promptImage;

  const {
    attempt,
    loading: attemptLoading,
    error: attemptError
  } = useSelector((state) => state.attempts);

  const {
    result: assessmentResult,
    loading: assessmentLoading,
    error: assessmentError
  } = useSelector((state) => state.writing);

  const {
    questions,
    loading: quizLoading,
    error: quizError
  } = useSelector((state) => state.questions);

  const quizData = useMemo(() => {
    if (!questions || questions.length === 0) {
      return null;
    }
    const task = questions[0];
    return {
      id: task.testId,
      questionId: task.id,
      taskType: task.part,
      promptText: task.title,
      promptImage: task.resourceContent
    };
  }, [questions]);


  // useEffect 1: Reset state khi ID thay đổi
  useEffect(() => {
    dispatch(resetWritingResult());
    setIsProcessed(false); // Reset cờ xử lý
  }, [attemptId, dispatch]);

  // useEffect 2: Fetch attempt (Luôn chạy)
  useEffect(() => {
    if (attemptId) {
      dispatch(retrieveAttempt(attemptId));
    }
  }, [attemptId, dispatch]);

  // useEffect 3: Fetch quiz data (Nếu cần)
  useEffect(() => {
    const quizId = attempt?.quizId; // e.g., 23

    if (!attemptLoading && attempt && quizId && quizId > 0) {
      const isDataMissing = !questions || questions.length === 0;
      const isDataMismatched = questions && questions.length > 0 && questions[0]?.testId !== quizId;

      if (isDataMissing || isDataMismatched) {
        console.log(`(Flow Mới/F5) Fetching đề bài thật với ID: ${quizId}`);
        dispatch(retrieveQuestionForTest(quizId));
      }
    }
  }, [attempt, attemptLoading, dispatch, questions]);

  // (LOGIC MỚI) useEffect 4: Xử lý xem lịch sử (History Flow)
  useEffect(() => {
    // Nếu 'attempt' đã tải VÀ 'attempt' có chứa feedback cũ (giả sử tên là 'aiFeedback')
    // VÀ chúng ta chưa xử lý
    // (Giả định: 'attempt.aiFeedback' là trường bạn lưu JSON nhận xét)
    if (attempt && attempt.aiFeedback && !isProcessed) {
      console.log("🌀 (Flow Lịch sử): Tìm thấy feedback cũ, đang tải vào Redux...");
      try {
        // (Giả định 'aiFeedback' là một JSON string, cần parse)
        const feedback = typeof attempt.aiFeedback === 'string'
          ? JSON.parse(attempt.aiFeedback)
          : attempt.aiFeedback;

        // Dùng action 'setWritingResult' để đưa feedback vào Redux
        dispatch(setWritingResult(feedback));
        setIsProcessed(true); // Đánh dấu là đã xử lý xong (Không gọi AI nữa)
      } catch (e) {
        console.error("Lỗi parse AI feedback cũ:", e);
        // Nếu parse lỗi, vẫn đánh dấu đã xử lý để tránh gọi AI
        setIsProcessed(true);
      }
    }
  }, [attempt, isProcessed, dispatch]);


  // (LOGIC SỬA ĐỔI) useEffect 5: Xử lý chấm bài mới (New Submission Flow)
  useEffect(() => {
    // Chỉ chạy nếu 'attempt' đã tải VÀ nó KHÔNG có feedback cũ
    const isReadyForNewCall = attempt && !attempt.aiFeedback;

    // Phải có dữ liệu từ location.state (chứng tỏ đây là flow nộp bài)
    const isNewSubmission = taskFromState && essayFromState;

    // Điều kiện gọi AI
    const canInitiateAiCall =
      isReadyForNewCall &&  // Phải là attempt mới
      isNewSubmission &&  // Phải là flow nộp bài
      !assessmentResult &&  // Redux store rỗng
      !assessmentLoading && // Không đang gọi
      !isProcessed;         // Chưa xử lý

    if (canInitiateAiCall) {
      console.log("📤 (Flow Mới): Không có feedback, đang gọi AI...");
      setIsProcessed(true); // Đánh dấu là đang xử lý

      const aiFormData = {
        task: taskFromState,
        essay: essayFromState,
      };

      dispatch(createSubmit(aiFormData))
        .unwrap()
        .then((result) => {
          console.log("✅ Nhận được kết quả AI:", result);
          const score = result?.overall_band_score;

          if (attemptId && (score !== null && score !== undefined)) {
            console.log(`✨ Đang cập nhật attempt [${attemptId}] với điểm VÀ feedback...`);

            // (BỔ SUNG) Gửi 'aiFeedback' (dưới dạng JSON string)
            const attemptData = {
              attemptId: attemptId,
              score: Math.round(score),
              // Gửi TOÀN BỘ 'result' (JSON)
              // Bạn cần đảm bảo backend có thể nhận trường 'aiFeedback' (ví dụ: kiểu Text/JSON)
              aiFeedback: JSON.stringify(result)
            };

            dispatch(updateAttempt(attemptData))
              .unwrap()
              .then(() => console.log(`✅ Cập nhật attempt [${attemptId}] thành công.`))
              .catch((err) => console.error(`❌ Lỗi khi cập nhật attempt:`, err));
          }
        })
        .catch((error) => {
          console.error("❌ Lỗi khi gọi AI:", error);
          setIsProcessed(false); // Cho phép thử lại nếu lỗi
        });
    }
  }, [
    taskFromState, essayFromState,
    attempt, // 'attempt' giờ rất quan trọng
    assessmentResult, assessmentLoading,
    isProcessed, dispatch, attemptId
  ]);

  // --- (Các useEffect và logic còn lại không đổi) ---

  // Handle image URL
  useEffect(() => {
    let imageUrl = null;
    const imageSource = imageFromState || quizData?.promptImage;
    if (imageSource) {
      if (typeof imageSource === "string") {
        imageUrl = imageSource;
      } else if (imageSource instanceof File || imageSource instanceof Blob) {
        imageUrl = URL.createObjectURL(imageSource);
      }
    }
    setPromptImageUrl(imageUrl);
    return () => {
      if (imageUrl && (imageSource instanceof File || imageSource instanceof Blob)) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageFromState, quizData?.promptImage]);

  // Handle resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const isLoading = attemptLoading || quizLoading || assessmentLoading;
  const combinedError = attemptError || assessmentError || quizError;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-white text-black font-sans items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full mx-auto p-10 bg-white rounded-xl">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Đang tải kết quả bài làm...
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {assessmentLoading
              ? "LexiBot đang phân tích bài viết của bạn. Việc này có thể mất một chút thời gian..."
              : "Đang tải dữ liệu bài làm..."}
          </p>
          <div className="flex justify-center items-center space-x-2">
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (combinedError || (!attempt && !attemptLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          Lỗi Tải Dữ Liệu
        </h1>
        <p className="text-gray-600">
          {combinedError ? (typeof combinedError === 'object' ? combinedError.message : combinedError) : "Không tìm thấy bài làm với ID này."}
        </p>
        <Link to="/" className="text-blue-600 mt-4">Quay về trang chủ</Link>
      </div>
    );
  }

  // LẤY DỮ LIỆU ĐỂ HIỂN THỊ
  const task = (quizData?.taskType === "Task 1" ? 1 : 2) || (taskFromState === "Task 1" ? 1 : 2) || 1;
  const promptText = taskFromState || quizData?.promptText || "Đang tải đề bài...";
  const essayText = essayFromState || attempt?.answers[0]?.userAnswer || "";
  const wordCount = essayText
    ? essayText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div ref={containerRef} className="flex flex-1 overflow-hidden mt-2">
        <WritingDisplayPanel
          width={leftWidth}
          task={task}
          promptText={promptText}
          essayText={essayText}
          promptImageUrl={promptImageUrl}
          wordCount={wordCount}
        />

        <div
          className="w-1 bg-gray-300 hover:bg-teal-500 cursor-col-resize transition-colors relative group"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-10 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <WritingAnalysisPanel
          width={100 - leftWidth}
          // 'assessmentResult' giờ sẽ là feedback cũ (History)
          // hoặc feedback mới (New)
          aiData={assessmentResult}
          wordCount={wordCount}
        />
      </div>
    </div>
  );
}