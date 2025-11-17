import React from "react";

export default function WritingDisplayPanel({
  width,
  task,
  promptText,
  promptImageUrl,
  essayText,
  wordCount,
}) {
  return (
    <div
      style={{ width: `${width}%` }}
      className="bg-white overflow-hidden flex flex-col"
    >
      <div className="bg-gray-100 px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Đề bài và bài làm
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ĐỀ BÀI */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
            {/* SVG Icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Đề bài (Task {task})
          </h3>
          <div className="text-gray-700 leading-relaxed">
            {/* Hiển thị ảnh */}
            {task === 1 && promptImageUrl && (
              <div className="mb-4">
                <img
                  src={promptImageUrl}
                  alt="Đề bài Task 1"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
            {/* Hiển thị text đề bài */}
            {promptText && (
              <p className="mb-4" style={{ fontSize: "18px" }}>
                <strong>{promptText}</strong>
              </p>
            )}
            {task === 2 && (
              <p className="text-sm text-blue-600">
                <em>Write at least 250 words.</em>
              </p>
            )}
          </div>
        </div>

        {/* BÀI LÀM */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center justify-between">
            <span className="flex items-center">
              {/* SVG Icon */}
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Bài làm của bạn
            </span>
            <span className="text-sm text-gray-500">{wordCount} từ</span>
          </h3>
          <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap">
            <p>{essayText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}