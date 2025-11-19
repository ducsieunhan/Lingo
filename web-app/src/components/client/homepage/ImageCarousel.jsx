// src/components/ImageCarousel.jsx
import React, { useState, useEffect } from "react";
// Import icons (tùy chọn, nếu bạn dùng lucide-react)
import { ChevronLeft, ChevronRight } from "lucide-react";

// === THAY ĐỔI 1: Sửa đường dẫn glob ===
// Trỏ đến src/images/ và tìm các file bannerX.jpeg
const imageModules = import.meta.glob("../images/banner*.{jpeg,jpg,png}", {
  eager: true,
});

const allImageUrls = Object.values(imageModules).map(
  (module) => module.default
);

const ImageCarousel = () => {
  const images = allImageUrls;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide (tùy chọn)
  useEffect(() => {
    if (images.length === 0) return; // Không làm gì nếu không có ảnh
    const timer = setInterval(() => {
      goToNext();
    }, 5000); // 5 giây
    return () => clearInterval(timer);
  }, [currentIndex, images.length]);


  const goToPrevious = () => {
    if (images.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (images.length === 0) return;
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) {
    return (
      <div className="text-center text-red-500 py-10">
        Không tìm thấy ảnh (ví dụ: banner1.jpeg) trong thư mục `src/images/`.
      </div>
    );
  }

  return (
    // === THAY ĐỔI 2: Làm carousel to hơn (max-w-5xl) ===
    <div className="relative w-full max-w-5xl mx-auto my-10">
      {/* Container cho ảnh (giúp giữ tỷ lệ) */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-video">
        {/* Dùng translate để tạo hiệu ứng mượt */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* === THAY ĐỔI 3: Style lại nút (chuyên nghiệp hơn) === */}
      {/* Nút Previous */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 shadow-md transition-all duration-300 z-10 flex items-center justify-center"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Nút Next */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 shadow-md transition-all duration-300 z-10 flex items-center justify-center"
      >
        <ChevronRight size={24} />
      </button>

      {/* === THAY ĐỔI 4: Style lại các dấu chấm === */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? "bg-blue-600 w-5" : "bg-gray-300"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;