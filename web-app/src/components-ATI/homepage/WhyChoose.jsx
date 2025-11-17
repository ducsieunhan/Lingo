// src/components/WhyChoose.jsx
import React from "react";
import { ArrowDown } from "lucide-react";

// === THAY ĐỔI 1: Import tất cả 4 icon .png ===
// (Đảm bảo bạn đã đặt 4 file này vào đúng đường dẫn)
import targetPngUrl from "../images/icons/target.png";
import teacherPngUrl from "../images/icons/teacher.png";
import analyticsPngUrl from "../images/icons/analytics.png";
import trophyPngUrl from "../images/icons/trophy.png";

const WhyChoose = () => {
    // === THAY ĐỔI 2: Cập nhật mảng features chỉ dùng 'imgSrc' ===
    const features = [
        {
            imgSrc: targetPngUrl,
            title: "Lộ trình cá nhân hóa",
            description:
                "Đánh giá năng lực và xây dựng lộ trình học phù hợp với từng học viên",
            gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
        },
        {
            imgSrc: teacherPngUrl,
            title: "Giảng viên 8.0+ IELTS",
            description:
                "Đội ngũ giảng viên có chứng chỉ IELTS 8.0+ và kinh nghiệm giảng dạy lâu năm",
            gradient: "bg-gradient-to-br from-blue-700 to-indigo-800",
        },
        {
            imgSrc: analyticsPngUrl,
            title: "Phân tích 4 kỹ năng",
            description:
                "Theo dõi và phân tích chi tiết tiến độ học tập qua 4 kỹ năng",
            gradient: "bg-gradient-to-br from-green-500 to-green-700",
        },
        {
            imgSrc: trophyPngUrl,
            title: "Thi thử không giới hạn",
            description:
                "Hệ thống thi thử mô phỏng 100% kỳ thi thật với kho đề thi cập nhật",
            gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
        },
    ];

    return (
        <section className="py-20 bg-white-200">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-4">
                        Tại sao chọn chúng tôi?
                    </h2>
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                        Chúng tôi cam kết mang đến phương pháp học IELTS hiệu quả nhất với
                        công nghệ hiện đại và đội ngũ chuyên gia hàng đầu
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-12 rounded-4xl shadow-lg card-hover text-left ${feature.gradient} text-white relative overflow-hidden card-wave-pattern`}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">

                                    {/* === THAY ĐỔI 3: Chỉ dùng thẻ <img> === */}
                                    <img
                                        src={feature.imgSrc}
                                        alt={feature.title}
                                        className="w-9 h-9 object-contain" // object-contain để ảnh không bị méo
                                    />
                                    {/* === HẾT THAY ĐỔI 3 === */}

                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-white opacity-90 leading-relaxed text-sm mb-4">
                                    {feature.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                        <ArrowDown className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;