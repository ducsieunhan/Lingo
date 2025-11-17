// src/components/SkillsCourses.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Headphones, BookOpen, PenSquare, Mic, ArrowRight } from "lucide-react";

// 1. Cấu trúc dữ liệu mới cho 4 thẻ Practice
const practiceSkills = [
  {
    Icon: Headphones,
    title: "Listening",
    description:
      "Practice & take IELTS Listening mock tests with materials matching the real test difficulty.",
    buttons: [
      { type: "link", text: "Academic", href: "/listening", style: "academic" },
    ],
    // === THAY ĐỔI: Đổi sang màu Blue ===
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    Icon: BookOpen,
    title: "Reading",
    description:
      "Practice & take IELTS Reading mock tests with materials matching the real test difficulty.",
    buttons: [
      { type: "link", text: "Academic", href: "/reading", style: "academic" },
    ],
    // === THAY ĐỔI: Đổi sang màu Blue ===
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    Icon: PenSquare,
    title: "Writing",
    description:
      "Practice & take IELTS Writing mock tests with tasks of the same difficulty as real IELTS exams.",
    buttons: [
      {
        type: "link",
        text: "Academic",
        href: "/writing",
        style: "academic",
      },
    ],
    // === THAY ĐỔI: Đổi sang màu Blue ===
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    Icon: Mic,
    title: "Speaking",
    description:
      "Practice & take IELTS Speaking mock tests with real exam-level difficulty.",
    // === THAY ĐỔI: Bỏ "Coming Soon" ===
    buttons: [
      {
        type: "link",
        text: "Academic",
        href: "/speaking", // Cần đảm bảo trang AI có tab Speaking
        style: "academic",
      },
    ],
    // === THAY ĐỔI: Đổi sang màu Blue ===
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

// 2. Component phụ để render các nút (Academic, General, Disabled)
const SkillButton = ({ type, text, href, style }) => {
  if (style === "academic") {
    return (
      // === THAY ĐỔI: Đổi nút "Academic" sang màu Blue ===
      <Link
        to={href}
        className="academic-button btn-hover"
      >
        {text}
      </Link>
    );
  }
  if (style === "general") {
    return (
      <Link
        to={href}
        className="academic-button btn-hover"
      >
        {text}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover-link:translate-x-1" />
      </Link>
    );
  }
  // (Các style "disabled" vẫn còn đây, nhưng không được dùng nữa)
  if (style === "disabled") {
    return (
      <button
        disabled
        className="academic-button btn-hover"
      >
        {text}
      </button>
    );
  }
  if (style === "disabled-link") {
    return (
      <span className="academic-button btn-hover">
        {text}
        <ArrowRight className="w-4 h-4" />
      </span>
    );
  }
  return null;
};

// 3. Component chính
const SkillsCourses = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề & Phụ đề */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            IELTS Online Skills Tests
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mt-2 mb-4">
            Practice Individual Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practice IELTS online by skill, using Cambridge and Actual test
            sets.
          </p>
        </div>

        {/* Lưới 2x2 chứa 4 thẻ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practiceSkills.map((skill) => (
            <div
              key={skill.title}
              className="bg-white p-10 rounded-2xl border border-blue-100 shadow-lg text-left flex flex-col h-full"
            >
              {/* Icon (giờ đã là màu blue) */}
              <div
                className={`w-16 h-16 ${skill.iconBg} rounded-full flex items-center justify-center mb-5`}
              >
                <skill.Icon className={`w-8 h-8 ${skill.iconColor}`} />
              </div>
              {/* Tiêu đề thẻ */}
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {skill.title}
              </h3>
              {/* Mô tả */}
              <p className="text-gray-600 text-lg mb-6 flex-grow">
                {skill.description}
              </p>
              {/* Nút bấm (giờ đã là màu blue và Speaking đã được kích hoạt) */}
              <div className="flex items-center gap-4">
                {skill.buttons.map((btn, index) => (
                  <SkillButton key={index} {...btn} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCourses;
