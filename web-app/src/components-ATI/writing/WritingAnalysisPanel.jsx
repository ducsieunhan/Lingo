import React from "react";

export default function WritingAnalysisPanel({ width, aiData, wordCount }) {
  // ✅ XỬ LÝ KHI aiData CHƯA CÓ (null/undefined)
  if (!aiData) {
    return (
      <div
        style={{ width: `${width}%` }}
        className="bg-gray-50 overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-b from-blue-400 to-indigo-400 text-black px-6 py-4">
          <h2 className="text-lg font-semibold">Đánh giá AI chi tiết</h2>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="h-3 w-3 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-3 w-3 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-3 w-3 bg-teal-600 rounded-full animate-bounce"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Đang chấm điểm...
            </h3>
            <p className="text-gray-500">
              LexiBot đang phân tích bài viết của bạn
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ CHUYỂN ĐỔI DỮ LIỆU TỪ API SANG FORMAT CŨ
  const scores = {
    overall: aiData.overall_band_score || 0,
    task: aiData.task_achievement?.suggested_band_score || 0,
    coherence: aiData.coherence_cohesion?.suggested_band_score || 0,
    lexical: aiData.lexical_resource?.suggested_band_score || 0,
    grammar: aiData.grammatical_range_accuracy?.suggested_band_score || 0,
  };

  const status = {
    level: `Band ${scores.overall}`,
    time: "Đã hoàn thành",
    state: "Đã chấm điểm",
  };

  // ✅ CHUYỂN ĐỔI ERRORS
  const errors = [];

  // Thêm lỗi từ Lexical Resource
  if (aiData.lexical_resource?.mistakes_rectified) {
    aiData.lexical_resource.mistakes_rectified.forEach((mistake, index) => {
      errors.push({
        typeVi: "Từ vựng",
        color: "yellow",
        location: `Câu ${index + 1}`,
        text: mistake.original,
        suggestion: mistake.correction,
        explanation: "Nên dùng từ chính xác hơn",
      });
    });
  }

  // Thêm lỗi từ Grammar
  if (aiData.grammatical_range_accuracy?.mistakes_rectified) {
    aiData.grammatical_range_accuracy.mistakes_rectified.forEach((mistake, index) => {
      errors.push({
        typeVi: "Ngữ pháp",
        color: "red",
        location: `Câu ${index + 1}`,
        text: mistake.original,
        suggestion: mistake.correction,
        explanation: "Lỗi ngữ pháp cần sửa",
      });
    });
  }

  // ✅ CHUYỂN ĐỔI SUGGESTIONS
  const suggestions = {
    strongPoints: aiData.feedback?.strengths || [],
    grammar: [
      aiData.grammatical_range_accuracy?.assessment || "Không có đánh giá",
    ],
    vocabulary: [
      aiData.lexical_resource?.assessment || "Không có đánh giá",
    ],
    coherence: [
      aiData.coherence_cohesion?.assessment || "Không có đánh giá",
    ],
  };

  const overallScore = scores.overall;
  const scoreAngle = (overallScore / 9) * 360;

  return (
    <div
      style={{ width: `${width}%` }}
      className="bg-gray-50 overflow-hidden flex flex-col"
    >
      <div className="bg-gradient-to-b from-blue-400 to-indigo-400 text-black px-6 py-4">
        <h2 className="text-lg font-semibold">Đánh giá AI chi tiết</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Score tổng quan
          </h3>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(from 0deg, #14b8a6 ${scoreAngle}deg, #e5e7eb ${scoreAngle}deg, #e5e7eb 360deg)`,
                  }}
                >
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-teal-600">
                      {overallScore.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Điểm tổng</p>
            </div>
            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <strong>Mức độ:</strong> {status.level}
              </div>
              <div className="mb-2">
                <strong>Thời gian:</strong> {status.time}
              </div>
              <div>
                <strong>Trạng thái:</strong>{" "}
                <span className="text-green-600 font-medium">
                  {status.state}
                </span>
              </div>
            </div>
          </div>

          {/* Chi tiết điểm từng tiêu chí */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Chi tiết điểm số
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-600">Task Achievement</p>
                <p className="text-lg font-bold text-blue-600">{scores.task}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-xs text-gray-600">Coherence & Cohesion</p>
                <p className="text-lg font-bold text-purple-600">{scores.coherence}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-xs text-gray-600">Lexical Resource</p>
                <p className="text-lg font-bold text-yellow-600">{scores.lexical}</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-xs text-gray-600">Grammar & Accuracy</p>
                <p className="text-lg font-bold text-red-600">{scores.grammar}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        {errors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              Phân tích lỗi ({errors.length} lỗi được tìm thấy)
            </h3>
            <div className="space-y-4">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className={`border-l-4 bg-${error.color}-50 p-4 rounded-r-lg`}
                  style={{
                    borderLeftColor: error.color === 'red' ? '#f87171' : '#fbbf24'
                  }}
                >
                  <div className="flex items-center mb-2">
                    <span
                      className={`bg-${error.color}-100 text-${error.color}-800 text-xs font-medium px-2 py-1 rounded`}
                    >
                      {error.typeVi}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {error.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Lỗi:</strong> "{error.text}" →{" "}
                    <strong>Sửa:</strong> "{error.suggestion}"
                  </p>
                  <p className="text-xs text-gray-600">{error.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.548-1.146l-.548-.547z"></path>
            </svg>
            Gợi ý cải thiện
          </h3>
          <div className="space-y-4">
            {suggestions.strongPoints.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">
                  Điểm mạnh cần duy trì
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  {suggestions.strongPoints.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                  <li>• Đạt yêu cầu về số từ ({wordCount} từ)</li>
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">
                Cải thiện ngữ pháp
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {suggestions.grammar.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Nâng cao từ vựng
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {suggestions.vocabulary.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-2">
                Tăng tính liên kết
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                {suggestions.coherence.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Feedback Summary */}
        {aiData.feedback?.summary && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tổng kết
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {aiData.feedback.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}