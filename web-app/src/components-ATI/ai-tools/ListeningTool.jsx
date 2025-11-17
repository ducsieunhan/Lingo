// src/components/ai-tools/ListeningTool.jsx
import React, { useState } from "react";
import { Play, Pause, Volume2, Maximize2, FileText, Check } from "lucide-react";

function ListeningTool() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState(Array(5).fill("")); // Giả lập 5 câu trả lời

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <section>
      {/* Trình phát Audio (Audio Player) */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between sticky top-20 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow-md"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white" />}
          </button>
          <div className="text-sm">
            <div className="font-semibold text-gray-800">Section 1: Conversation</div>
            <div className="text-gray-500">00:34 / 03:15</div>
          </div>
        </div>

        {/* Thanh tua (Seek Bar) */}
        <div className="flex-1 mx-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: "15%" }}></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 size={20} className="text-gray-600 cursor-pointer" />
          <Maximize2 size={20} className="text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Khu vực làm bài */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Cột 1: Phiếu câu hỏi (Question Sheet) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Questions 1-5</h3>
            <p className="text-sm text-gray-600">Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.</p>
          </div>
          <div className="p-6 space-y-4 text-base min-h-[400px]">
            <h4 className="font-bold">Accommodation Form</h4>
            <p><strong>Type of accommodation:</strong> Hall of Residence</p>
            <p><strong>Room type:</strong> Single room</p>
            <p><strong>Name:</strong> <strong>(1)</strong> ____________________</p>
            <p><strong>Date of Birth:</strong> 13th October 1999</p>
            <p><strong>Contact Number:</strong> <strong>(2)</strong> ____________________</p>
            <p><strong>Length of stay:</strong> <strong>(3)</strong> ____________________</p>
            <p><strong>Meal plan:</strong> <strong>(4)</strong> ____________________</p>
            <p><strong>Specific requirements:</strong> Must be on the <strong>(5)</strong> ____________________ floor.</p>
          </div>
        </div>

        {/* Cột 2: Phiếu trả lời (Answer Sheet) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Your Answers</h3>
            <p className="text-sm text-gray-600">Type your answers in the boxes below.</p>
          </div>
          <div className="p-6 space-y-3 min-h-[400px]">
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-3">
                <label htmlFor={`answer-${index}`} className="font-semibold text-gray-700 w-8 text-right">
                  {index + 1}.
                </label>
                <input
                  type="text"
                  id={`answer-${index}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nút chức năng */}
      <div className="mt-6 flex justify-between items-center">
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-lg transition">
          <FileText size={18} />
          Xem Transcript
        </button>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg">
          <Check size={20} />
          Chấm Điểm
        </button>
      </div>
    </section>
  );
}

export default ListeningTool;