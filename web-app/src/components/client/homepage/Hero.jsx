// src/components/Hero.jsx
import React from "react";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";
import { ArrowDownOutlined } from "@ant-design/icons";

// Import ảnh học sinh

const Hero = () => {
    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight - 64, // Giả sử navbar cao 64px
            behavior: "smooth",
        });
    };

    return (
        <section
            className="hero-gradient pt-0 flex items-center relative w-full rounded-b-[50px]"
            style={{ minHeight: "calc(100vh - 64px)" }}
        >
            {/* Full width container so hero is not constrained by max-width */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-20 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Left Content (Giữ nguyên) */}
                    <div className="text-gray-800 h-full flex flex-col justify-center">
                        {/* ... (Toàn bộ code h1, p, Link của bạn) ... */}
                        <h1 className="text-blue-950 text-[56px] font-semibold   leading-[120%] tracking-tighter mb-6">
                            Free Online{" "}
                            <span
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to bottom, #3b82f6, #22d3ee)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent",
                                    paddingBottom: "4px",
                                }}
                                className="inline-block font-bold"
                            >
                                IELTS
                            </span>{" "}
                            Practice Tests
                        </h1>
                        <p className="text-gray-700 md:text-2xl mb-8 leading-relaxed">
                            LexiPrep for IELTS – Practice & take mock tests online with a free
                            test bank, including real & Cambridge tests. Simulated
                            computer-based interface, with instant scoring.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/signup"
                                className="academic-button !w-60 flex justify-center items-center !h-16 font-semibold btn-hover !text-lg"
                            >
                                Practice by Test Set
                            </Link>
                            <Link
                                to="/ai-assessment-page"
                                className="!bg-white border-2 !border-gray-400 !text-gray-700 hover:!bg-gray-100 hover:!border-gray-500 px-8 py-4 rounded-[8px] text-lg font-semibold btn-hover"
                            >
                                Practice by Skills
                            </Link>
                        </div>
                    </div>

                    {/* === THAY ĐỔI LỚN TẠI ĐÂY === */}
                    {/* Cột bên phải:
            - Đặt 'relative' để các phần tử 'absolute' con căn theo nó.
            - 'overflow-hidden': Cắt những phần tràn ra ngoài.
            - 'h-full': Đảm bảo div này chiếm toàn bộ chiều cao khả dụng.
            - 'min-h-[400px]': Đặt một chiều cao tối thiểu để đảm bảo ảnh luôn có đủ không gian hiển thị, kể cả khi nội dung cột trái ngắn. Điều chỉnh giá trị này nếu cần.
          */}
                    <div className="relative overflow-hidden rounded-lg h-full min-h-[400px]">
                        {/* Ảnh học sinh (Lớp nền) */}
                        {/*
              - 'absolute inset-0': Ảnh lấp đầy toàn bộ không gian của div cha.
              - 'w-full h-full': Đảm bảo ảnh chiếm 100% chiều rộng và chiều cao của container.
              - 'object-cover': Phóng to ảnh để lấp đầy container, cắt bớt phần thừa nếu tỷ lệ khung hình không khớp.
              - 'scale-125': (Tùy chọn) Vẫn giữ để ảnh to hơn một chút nếu bạn muốn.
              - 'z-0': Đảm bảo ảnh nằm ở lớp dưới cùng.
            */}

                        {/* ImageCarousel (Lớp phủ) */}
                        {/*
              - 'absolute inset-0': Lớp phủ này cũng lấp đầy toàn bộ không gian của div cha.
              - 'flex justify-center items-center': Căn giữa ImageCarousel trong lớp phủ này.
              - 'z-10': Đảm bảo Carousel nằm trên ảnh.
            */}
                        <div className="absolute inset-0 flex justify-center items-center z-10">
                            <ImageCarousel />
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon mũi tên xuống (Giữ nguyên) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
                <button
                    onClick={handleScrollDown}
                    className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
                    style={{ width: "48px", height: "48px" }}
                    aria-label="Scroll down"
                >
                    <ArrowDownOutlined style={{ fontSize: "24px", color: "#374151" }} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
