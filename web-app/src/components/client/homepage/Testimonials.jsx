// src/components/Testimonials.jsx
import React from "react";
import { Quote } from "lucide-react";

// === THAY ĐỔI 1: Import ảnh từ đường dẫn tương đối chính xác ===
import avt1 from "../images/avt1.jpg";
import avt2 from "../images/avt2.jpg";
import avt3 from "../images/avt3.jpg";
import avt4 from "../images/avt4.jpg";
import avt5 from "../images/avt5.jpg";
import avt6 from "../images/avt6.jpg";

const Testimonials = () => {
  // === THAY ĐỔI 2: Sử dụng các biến đã import ===
  const testimonials = [
    {
      avatar: avt1, // Thay vì chuỗi string, dùng biến đã import
      name: "Phạm Bình Minh",
      score: "8.0",
      comment:
        "Prep IELTS đã giúp tôi từ 5.5 lên 8.0 chỉ trong 6 tháng. Phương pháp học rất khoa học và giảng viên nhiệt tình hỗ trợ.",
    },
    {
      avatar: avt2, // Dùng biến đã import
      name: "Ngô Đức Minh",
      score: "7.5",
      comment:
        "Hệ thống thi thử rất hay, giúp tôi làm quen với format đề thi và cải thiện kỹ năng làm bài một cách hiệu quả.",
    },
    {
      avatar: avt3, // Dùng biến đã import
      name: "Lê Thị Nam",
      score: "8.5",
      comment:
        "Lộ trình học cá nhân hóa rất phù hợp. Tôi đã đạt 8.5 IELTS và được nhận học bổng du học Úc như mong muốn.",
    },
    {
      avatar: avt4, // Dùng biến đã import
      name: "Phạm Văn Vinh",
      score: "7.0",
      comment:
        "AI chấm điểm rất chính xác, giúp tôi biết được điểm yếu và cải thiện nhanh chóng. Highly recommended!",
    },
    {
      avatar: avt5, // Dùng biến đã import
      name: "Hoàng Thị Tú",
      score: "8.0",
      comment:
        "Khóa học Writing rất chi tiết, từ cấu trúc đến từ vựng. Tôi đã cải thiện Writing từ 5.5 lên 8.0.",
    },
    {
      avatar: avt6, // Dùng biến đã import
      name: "Ngô Thanh Hóa",
      score: "7.5",
      comment:
        "Speaking practice với AI rất thú vị và hiệu quả. Tôi tự tin hơn nhiều khi nói tiếng Anh.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Feedback from our users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn học viên đã đạt mục tiêu IELTS và thành công trong hành
            trình du học, định cư
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg card-hover overflow-hidden border border-blue-100 relative"
            >
              <Quote className="absolute top-4 right-4 w-16 h-16 text-blue-50 opacity-75" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar} // src sẽ trỏ đến biến đã import
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-2">⭐</span>
                      <span className="font-bold text-blue-600">
                        IELTS {testimonial.score}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;