import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link đã được import
import { PenSquare, Mic, ArrowRight } from "lucide-react";
import beePngUrl from "../images/bee.png";
import {
  HighlightOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const PracticeModeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Lớp phủ (overlay)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000078]"
      onClick={onClose} // Nhấn vào overlay để đóng
    >
      {/* Nội dung Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl p-10 mx-4"
        onClick={(e) => e.stopPropagation()} // Ngăn click bên trong modal đóng modal
      >
        {/* Nút đóng (X) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <CloseOutlined style={{ fontSize: "24px" }} />
        </button>

        {/* Grid 2 cột cho 2 chế độ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột 1: Chế độ luyện tập (Style theo ảnh) */}
          <div className="text-center flex flex-col items-center p-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <HighlightOutlined style={{ fontSize: "40px" }} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              AI Practice Mode
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Practice with customizable time and AI support.
            </p>
            <Link
              to="/writing-test"
              className="w-full !bg-gray-800 hover:!bg-gray-900 !text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              onClick={onClose}
            >
              <RocketOutlined />
              Practice with AI
            </Link>
          </div>

          <div className="text-center flex flex-col items-center p-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <ClockCircleOutlined style={{ fontSize: "40px" }} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Simulation Mode
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Real exam simulation with limited time and no AI support.
            </p>
            <Link
              to="/speaking"
              className="w-full !bg-gray-800 hover:!bg-gray-900 !text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              onClick={onClose}
            >
              <FieldTimeOutlined />
              Timed Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
// === KẾT THÚC COMPONENT MODAL ===

const AIIELTS = () => {
  // === State này vẫn cần cho nút Writing ===
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* ... (Phần tiêu đề và con ong giữ nguyên) ... */}
        <div className="flex justify-center mb-8">
          <img
            src={beePngUrl}
            alt="Bee Mascot"
            className="w-50 h-auto transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          AI-Powered IELTS Writing & Speaking Evaluation 
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Instantly get feedback on Writing and Speaking skills. Our AI
          Assistant evaluates your record with detailed comments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Card 1: Writing (Vẫn mở Modal) */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <PenSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Writing</h3>
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Practice & take IELTS Listening mock tests with materials matching
              the real test difficulty.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-800 !text-white px-8 py-2.5 rounded-lg font-medium btn-hover cursor-pointer !text-[16.5px]"
              >
                Academic
              </button>
            </div>
          </div>

          {/* Card 2: Speaking (Chuyển thành Link, không mở modal) */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <Mic className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Speaking</h3>
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Practice & take IELTS Listening mock tests with materials matching
              the real test difficulty.
            </p>
            <div className="flex items-center gap-4">
              {/* === THAY ĐỔI: Chuyển <button> thành <Link> === */}
              <Link
                to="/speaking" // Điều hướng thẳng đến trang speaking (Timed Test)
                // Thêm 'text-lg' và '!text-white' để chống xung đột CSS
                className="bg-blue-600 hover:bg-blue-900 !text-white px-6 py-2.5 rounded-lg font-medium btn-hover academic-button cursor-pointer"
              >
                Academic
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal này giờ chỉ được gọi bởi nút Writing */}
      <PracticeModeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </section>
  );
};

export default AIIELTS;