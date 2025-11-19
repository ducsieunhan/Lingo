// src/components/ai-tools/ReadingTool.jsx
import React, { useState } from "react";
import { Check, Timer } from "lucide-react";

function ReadingTool() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "", q4: "" });

  const handleOptionChange = (q, value) => {
    setAnswers(prev => ({ ...prev, [q]: value }));
  };

  return (
    <section>
      {/* Thanh điều khiển */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between sticky top-20 z-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Reading Passage 1</h2>
          <p className="text-sm text-gray-600">You should spend about 20 minutes on Questions 1-5.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <Timer size={20} />
            <span>45:30</span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg">
            <Check size={20} />
            Chấm Điểm
          </button>
        </div>
      </div>

      {/* Khu vực làm bài 2 cột */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Cột 1: Bài Đọc (Passage) */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-y-auto"
          style={{ maxHeight: "70vh" }} // Giới hạn chiều cao và cho phép cuộn
        >
          <h3 className="text-lg font-bold mb-4">The Rise of Artificial Intelligence</h3>
          <div className="space-y-4 text-base text-gray-700 leading-relaxed">
            <p>
              Artificial Intelligence (AI) is a field of computer science that emphasizes the creation of intelligent machines that work and react like humans. The term was coined by John McCarthy in 1956. Today, it is a broad field, encompassing machine learning, deep learning, neural networks, and more.
            </p>
            <p>
              Machine learning, a subset of AI, involves the use of algorithms and statistical models to enable computers to learn from and make predictions or decisions based on data. It is the technology behind spam filters, recommendation engines, and predictive text.
            </p>
            <p>
              Deep learning takes this a step further, using complex, multi-layered "neural networks" to solve intricate problems. These networks are inspired by the human brain. Deep learning powers virtual assistants like Siri and Alexa, as well as advanced applications in medical diagnosis and self-driving cars.
            </p>
            <p>
              While the potential benefits of AI are vast—ranging from scientific discovery to automating mundane tasks—it also raises significant ethical questions. Concerns about job displacement, algorithmic bias, and the potential for superhuman intelligence (or "singularity") are actively debated by experts and policymakers.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>

        {/* Cột 2: Câu hỏi (Questions) */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-y-auto"
          style={{ maxHeight: "70vh" }} // Giới hạn chiều cao và cho phép cuộn
        >
          <div className="space-y-8">
            {/* Câu hỏi 1: Multiple Choice */}
            <div>
              <p className="font-semibold mb-2">1. When was the term "Artificial Intelligence" coined?</p>
              <div className="space-y-2">
                <RadioOption name="q1" label="1956" checked={answers.q1 === "1956"} onChange={() => handleOptionChange("q1", "1956")} />
                <RadioOption name="q1" label="1999" checked={answers.q1 === "1999"} onChange={() => handleOptionChange("q1", "1999")} />
                <RadioOption name="q1" label="1945" checked={answers.q1 === "1945"} onChange={() => handleOptionChange("q1", "1945")} />
              </div>
            </div>

            {/* Câu hỏi 2 & 3: True/False/Not Given */}
            <div>
              <p className="font-semibold mb-2">Questions 2-3: Do the following statements agree with the information given in the passage?</p>
              <p className="font-semibold mb-3">Write:</p>
              <ul className="list-disc list-inside text-sm mb-3">
                <li><strong>TRUE</strong> if the statement agrees with the information</li>
                <li><strong>FALSE</strong> if the statement contradicts the information</li>
                <li><strong>NOT GIVEN</strong> if there is no information on this</li>
              </ul>
              <TFNGQuestion num={2} label="Deep learning is inspired by the human heart." />
              <TFNGQuestion num={3} label="AI is only concerned with automating mundane tasks." />
            </div>

            {/* Câu hỏi 4: Fill in the blank */}
            <div>
              <p className="font-semibold mb-2">4. Technology like spam filters is powered by _______________.</p>
              <input
                type="text"
                value={answers.q4}
                onChange={(e) => handleOptionChange("q4", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === CÁC COMPONENT PHỤ ===

// Component phụ cho Radio Button
const RadioOption = ({ name, label, checked, onChange }) => (
  <label className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
    />
    <span className="ml-3 text-gray-700">{label}</span>
  </label>
);

// Component phụ cho True/False/Not Given
const TFNGQuestion = ({ num, label }) => (
  <div className="mb-3">
    <p className="mb-2"><strong>{num}.</strong> {label}</p>
    <div className="flex gap-2">
      <button className="text-sm font-medium border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100">TRUE</button>
      <button className="text-sm font-medium border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100">FALSE</button>
      <button className="text-sm font-medium border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-100">NOT GIVEN</button>
    </div>
  </div>
);

export default ReadingTool;