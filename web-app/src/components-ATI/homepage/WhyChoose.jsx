// src/components/client/homepage/WhyChoose.jsx
import React from "react";
// import { ArrowDown } from "lucide-react"; // Bỏ import ArrowDown

// Import tất cả 4 icon .png
import targetPngUrl from "../images/icons/target.png";
import teacherPngUrl from "../images/icons/teacher.png";
import analyticsPngUrl from "../images/icons/analytics.png";
import trophyPngUrl from "../images/icons/trophy.png";

const WhyChoose = () => {
    // Cập nhật mảng features với text tiếng Anh
    const features = [
        {
            imgSrc: targetPngUrl,
            title: "Personalized Learning Path",
            description:
                "Assess your ability and build a learning path tailored to each student.",
            gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
        },
        {
            imgSrc: teacherPngUrl,
            title: "8.0+ IELTS Instructors",
            description:
                "A team of instructors with 8.0+ IELTS certificates and extensive teaching experience.",
            gradient: "bg-gradient-to-br from-blue-700 to-indigo-800",
        },
        {
            imgSrc: analyticsPngUrl,
            title: "4-Skill Analysis",
            description:
                "Track and analyze detailed learning progress across all 4 skills.",
            gradient: "bg-gradient-to-br from-green-500 to-green-700",
        },
        {
            imgSrc: trophyPngUrl,
            title: "Unlimited Mock Tests",
            description:
                "A mock test system that 100% simulates the real exam with an updated test bank.",
            gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    {/* Đã dịch sang tiếng Anh */}
                    <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-4">
                        Why Choose Us?
                    </h2>
                    {/* Đã dịch sang tiếng Anh */}
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                        We deliver effective IELTS learning through modern technology and a team of leading experts.
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
                                    <img
                                        src={feature.imgSrc}
                                        alt={feature.title}
                                        className="w-10 h-10 object-contain" // object-contain để ảnh không bị méo
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-white opacity-90 leading-relaxed text-sm mb-4">
                                    {feature.description}
                                </p>

                                {/* --- KHỐI MŨI TÊN ĐÃ BỊ XÓA --- */}
                                {/* <div className="mt-auto">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                        <ArrowDown className="w-5 h-5 text-white" />
                                    </div>
                                </div> 
                                */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;