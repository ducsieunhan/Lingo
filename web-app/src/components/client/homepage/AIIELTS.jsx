import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Landmark, ArrowRight } from "lucide-react";
// === THAY ĐỔI: Import thêm CloseOutlined ===
import {
  HighlightOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  CloseOutlined, // Thêm icon này
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
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
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
              Chế độ luyện tập
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Luyện tập với thời gian gian tùy chỉnh cùng sự hỗ trợ của AI.
            </p>
            <Link
              to="/writing-test"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={onClose}
            >
              <RocketOutlined />
              Luyện tập với AI
            </Link>
          </div>

          <div className="text-center flex flex-col items-center p-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <ClockCircleOutlined style={{ fontSize: "40px" }} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Chế độ thi thử
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Mô phỏng thi thật với thời gian giới hạn và không có AI hỗ trợ.
            </p>
            <Link
              to="/speaking"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              onClick={onClose}
            >
              <FieldTimeOutlined />
              Thi thử tính giờ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
// === KẾT THÚC COMPONENT MODAL ===

const AIIELTS = () => {
  // === THÊM MỚI: State để quản lý modal ===
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* ... (Phần tiêu đề và con ong giữ nguyên) ... */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/bee.png"
            alt="Bee Mascot"
            className="w-50 h-auto transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          <span className="text-blue-600">AI IELTS</span> for providing better
          test preparation
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Instantly get feedback on Writing and Speaking skills. Our AI
          Assistant evaluates your record with detailed comments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Card 1: Cambridge */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <Landmark className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Writing</h3>
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Practice & take IELTS Listening mock tests with materials matching
              the real test difficulty.
            </p>
            {/* === THAY ĐỔI: Chuyển thành button mở modal === */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium btn-hover"
              >
                Academic
              </button>
            </div>
            {/* === XÓA BỎ: Đã xóa 2 chế độ hiển thị inline ở đây === */}
          </div>

          {/* Card 2: Collins */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <Landmark className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Speaking</h3>
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Practice & take IELTS Listening mock tests with materials matching
              the real test difficulty.
            </p>
            {/* === THAY ĐỔI: Chuyển thành button mở modal === */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium btn-hover"
              >
                Academic
              </button>
            </div>
            {/* === XÓA BỎ: Đã xóa 2 chế độ hiển thị inline ở đây === */}
          </div>
        </div>
      </div>

      {/* === THÊM MỚI: Gọi Modal component === */}
      {/* Modal này sẽ được điều khiển bởi state 'isModalOpen' */}
      <PracticeModeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AIIELTS;
