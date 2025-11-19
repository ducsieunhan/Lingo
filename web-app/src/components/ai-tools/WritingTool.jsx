// src/components/ai-tools/WritingTool.jsx
import React, { useState } from "react";
import {
  Settings,
  Timer,
  Copy,
  ClipboardPaste,
  Trash2,
  Undo2,
  Redo2,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

function WritingTool() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const [options, setOptions] = useState({
    aiReasoning: true,
    improveWordChoice: false,
    detailedFeedback: true,
    sampleEssay: true,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  // Cập nhật word count
  const handleAnswerChange = (e) => {
    const text = e.target.value;
    setAnswer(text);
    if (text.trim() === "") {
      setWordCount(0);
    } else {
      setWordCount(text.trim().split(/\s+/).length);
    }
  };

  return (
    // Bỏ div container max-w-4xl bên ngoài
    <section>
      {/* THANH ĐIỀU KHIỂN CHÍNH (Full-width) */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sticky top-20 z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          {/* Bên trái: Nút Chấm điểm & Cài đặt */}
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg">
              <Check size={20} />
              Chấm Điểm
            </button>
            <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            {/* Tooltip band điểm */}
            <div className="relative group hidden lg:block">
              <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full cursor-help">
                Nhận band điểm ước tính cùng đánh giá chi tiết từ LexiBot AI.
              </span>
            </div>
          </div>

          {/* Bên phải: Tùy chọn */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Dropdowns */}
            <div className="flex items-center gap-4">
              <SelectBox id="task" label="Loại Task">
                <option>IELTS Writing Task 2</option>
                <option>IELTS Writing Task 1</option>
              </SelectBox>
              <SelectBox id="lang" label="Ngôn Ngữ AI" required>
                <option>Vietnamese - Tiếng Việt</option>
                <option>English - Tiếng Anh</option>
              </SelectBox>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Checkbox
                id="aiReasoning"
                name="aiReasoning"
                label="AI Reasoning"
                checked={options.aiReasoning}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                id="detailedFeedback"
                name="detailedFeedback"
                label="Đánh Giá Chi Tiết"
                checked={options.detailedFeedback}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                id="sampleEssay"
                name="sampleEssay"
                label="Bài Luận Mẫu"
                checked={options.sampleEssay}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* KHUNG NHẬP ĐỀ BÀI (Full-width) */}
      <div className="mt-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Nhập đề bài... (Ví dụ: Some people think that robots are important for human's future development...)"
          className="w-full h-28 p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        />
      </div>

      {/* KHUNG SOẠN THẢO BÀI LÀM (Full-width) */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar của trình soạn thảo */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            <IconButton icon={<Check size={18} />} label="Accept All" />
            <IconButton icon={<X size={18} />} label="Reject All" />
            <IconButton icon={<Timer size={18} />} label="Timer" />
          </div>
          <div className="flex gap-4">
            <IconButton icon={<Copy size={18} />} label="Copy" />
            <IconButton icon={<ClipboardPaste size={18} />} label="Paste" />
            <IconButton icon={<Trash2 size={18} />} label="Clear" />
          </div>
        </div>

        {/* Vùng nhập text */}
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Bắt đầu nhập câu trả lời của bạn tại đây..."
          className="w-full min-h-[400px] p-5 text-base focus:outline-none resize-y"
        />

        {/* Thanh trạng thái */}
        <div className="flex justify-between items-center p-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
          <div className="flex gap-2">
            <button className="p-1 hover:text-blue-600 transition"><Undo2 size={18} /></button>
            <button className="p-1 hover:text-blue-600 transition"><Redo2 size={18} /></button>
          </div>
          <span>{wordCount} words</span>
        </div>
      </div>
    </section>
  );
}

// === CÁC COMPONENT PHỤ ===

// Component phụ cho Checkbox (Dùng màu blue)
const Checkbox = ({ id, name, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label htmlFor={id} className="ml-2 text-sm text-gray-700">
      {label}
    </label>
  </div>
);

// Component phụ cho IconButton
const IconButton = ({ icon, label }) => (
  <button className="flex items-center gap-1.5 hover:text-blue-600 transition text-sm text-gray-600 font-medium">
    {icon}
    <span>{label}</span>
  </button>
);

// Component phụ cho SelectBox
const SelectBox = ({ id, label, required = false, children }) => (
  <div className="flex items-center">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">
      {required && <span className="text-red-500">*</span>}
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
);

export default WritingTool;