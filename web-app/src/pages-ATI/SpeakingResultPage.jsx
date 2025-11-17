import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GraduationCap,
  BookOpen,
  Check,
  Waves,
  Volume2,
  X,
} from "lucide-react";
import { retrieveResult } from "../slice-ATI/speaking";
import { retrieveAttempt } from "../slice/attempts";

function SpeakingResultPage() {
  const dispatch = useDispatch();
  const { attemptId } = useParams();

  const {
    result: assessmentResult,
    loading: assessmentLoading,
    error: assessmentError,
  } = useSelector((state) => state.speaking);

  const {
    attempt,
    loading: attemptLoading,
    error: attemptError,
  } = useSelector((state) => state.attempts);

  // ✅ SỬA LỖI: Dùng useRef để track việc đã fetch (không trigger re-render)
  const attemptFetchedRef = useRef(false);
  const resultFetchedRef = useRef(false);
  const lastAttemptIdRef = useRef(null);
  const lastGradingIdRef = useRef(null);

  // ✅ Reset refs khi attemptId thay đổi
  useEffect(() => {
    if (lastAttemptIdRef.current !== attemptId) {
      console.log('🔄 AttemptId changed, resetting refs');
      attemptFetchedRef.current = false;
      resultFetchedRef.current = false;
      lastAttemptIdRef.current = attemptId;
      lastGradingIdRef.current = null;
    }
  }, [attemptId]);

  // ✅ Hook 1: Fetch attempt CHỈ MỘT LẦN
  useEffect(() => {
    if (!attemptId || attemptFetchedRef.current) {
      return;
    }

    // Kiểm tra xem đã có attempt với đúng ID chưa
    const hasCorrectAttempt = attempt && String(attempt.id) === String(attemptId);

    if (!hasCorrectAttempt && !attemptLoading) {
      console.log('📥 Fetching attempt:', attemptId);
      attemptFetchedRef.current = true;
      dispatch(retrieveAttempt(attemptId));
    }
  }, [attemptId, attemptLoading]); // ❌ BỎ 'attempt' khỏi dependencies

  // ✅ Hook 2: Fetch result CHỈ MỘT LẦN
  useEffect(() => {
    if (!attempt || !attempt.gradingIeltsId || resultFetchedRef.current) {
      return;
    }

    // Kiểm tra xem gradingId có thay đổi không
    const gradingIdChanged = lastGradingIdRef.current !== attempt.gradingIeltsId;

    if (gradingIdChanged && !assessmentLoading) {
      console.log('📥 Fetching result for gradingId:', attempt.gradingIeltsId);
      resultFetchedRef.current = true;
      lastGradingIdRef.current = attempt.gradingIeltsId;
      dispatch(retrieveResult(attempt.gradingIeltsId));
    }
  }, [attempt?.gradingIeltsId, assessmentLoading]); // ❌ BỎ 'assessmentResult' khỏi dependencies

  const isLoading =
    assessmentLoading || (attemptId && attemptLoading && !attempt);

  const combinedError = assessmentError || attemptError;
  const hasError = !attemptId || combinedError;

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-white text-black font-sans items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full mx-auto p-10 bg-white rounded-xl">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Đang tải kết quả...
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Vui lòng chờ trong giây lát.
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

  if (hasError) {
    return (
      <div className="flex flex-col h-screen w-full bg-white text-black font-sans items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full mx-auto p-10">
          <X size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            {combinedError ? "Lỗi Tải Dữ Liệu" : "Không tìm thấy bài thi"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {combinedError
              ? combinedError.message || "Đã xảy ra lỗi không xác định."
              : "Không tìm thấy dữ liệu. Vui lòng kiểm tra lại URL."}
          </p>
          <Link
            to="/speaking"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Quay lại
          </Link>
        </div>
      </div>
    );
  }

  const finalAudioUrl = attempt?.answers?.[0]?.userAnswer;

  if (assessmentResult) {
    return (
      <div className="flex flex-col h-screen w-full bg-gray-50 text-black font-sans">
        <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Lexi<span className="text-blue-600">Prep</span>
          </Link>
          <Link
            to="/speaking"
            className="flex items-center gap-1.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <X size={18} />
            Đóng
          </Link>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <AssessmentResult
            result={assessmentResult}
            recordingUrl={finalAudioUrl}
          />
        </main>
      </div>
    );
  }

  return null;
}

const AssessmentResult = ({ result, recordingUrl }) => {
  const { scores, feedback, transcript } = result || { scores: {}, feedback: {} };
  const safeScores = scores || {};
  const safeFeedback = feedback || {};

  const criteria = [
    { key: "task_response", title: "Task Response", score: safeScores.task_response || 0, icon: <Check />, color: "green", feedback: safeFeedback.task_response },
    { key: "fluency", title: "Fluency", score: safeScores.fluency || 0, icon: <Waves />, color: "cyan", feedback: safeFeedback.fluency },
    { key: "pronunciation", title: "Pronunciation", score: safeScores.pronunciation || 0, icon: <Volume2 />, color: "purple", feedback: safeFeedback.pronunciation },
    { key: "grammar", title: "Grammar", score: safeScores.grammar || 0, icon: <BookOpen />, color: "red", feedback: safeFeedback.grammar },
    { key: "vocabulary", title: "Vocabulary", score: safeScores.vocabulary || 0, icon: <BookOpen />, color: "orange", feedback: safeFeedback.vocabulary },
  ];

  const overallScore = safeScores.overall || 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 slide-up">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-6 text-center flex flex-col justify-center items-center bg-blue-600 text-white">
            <p className="text-lg font-medium text-blue-100 uppercase tracking-wide">
              Overall Band Score
            </p>
            <div className="text-8xl font-bold my-2">
              {(Math.round(overallScore / 5) * 5).toFixed(1)}
            </div>
            <div className="w-full h-2 bg-blue-800 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full"
                style={{ width: `${(overallScore / 9) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="lg:w-2/3 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Điểm thành phần
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {criteria.map((item) => (
                <SubScoreCard
                  key={item.key}
                  title={item.title}
                  score={item.score}
                  icon={item.icon}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Audio Của Bạn
          </h3>
          <audio src={recordingUrl} controls className="w-full h-12" />
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">
            Transcript
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{transcript || "Không có transcript."}"
            </p>
          </div>
        </div>
        <FeedbackCard
          icon={<GraduationCap />}
          title="Nhận Xét Chung (Overall)"
          content={safeFeedback.overall || "Không có nhận xét chung."}
          color="blue"
          isMain={true}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Phân Tích Chi Tiết
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteria.map((item) => (
            <FeedbackCard
              key={item.key}
              icon={item.icon}
              title={item.title}
              content={item.feedback || "Không có nhận xét."}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SubScoreCard = ({ title, score, icon, color }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    cyan: "text-cyan-600 bg-cyan-50",
    gray: "text-gray-600 bg-gray-50",
  };
  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 ${colors[color]}`}>
      <div className="flex-shrink-0">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <div>
        <div className="text-sm font-medium opacity-80">{title}</div>
        <div className="text-2xl font-bold">
          {(score || 0).toFixed(1)}
        </div>
      </div>
    </div>
  );
};

const FeedbackCard = ({ icon, title, content, color = "gray", isMain = false }) => {
  const colors = {
    blue: "border-blue-500 bg-blue-50 text-blue-800",
    green: "border-green-500 bg-green-50 text-green-800",
    red: "border-red-500 bg-red-50 text-red-800",
    orange: "border-orange-500 bg-orange-50 text-orange-800",
    purple: "border-purple-500 bg-purple-50 text-purple-800",
    cyan: "border-cyan-500 bg-cyan-50 text-cyan-800",
    gray: "border-gray-500 bg-gray-50 text-gray-800",
  };
  const mainClass = isMain
    ? "bg-white rounded-xl shadow-xl border border-gray-200"
    : `rounded-lg ${colors[color]} border-l-4`;
  return (
    <div className={`p-6 ${mainClass}`}>
      <h4 className={`font-bold text-xl mb-3 flex items-center gap-3 ${isMain ? colors[color] : ''}`}>
        {React.cloneElement(icon, { className: "w-6 h-6 flex-shrink-0" })}
        {title}
      </h4>
      <p className="text-md text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default SpeakingResultPage;