// src/components/Partners.jsx
import React from "react";
import idp from "../images/gioi-thieu-ve-idp.jpg";
import BritishCouncil from "../images/british.png";
import ipt from "../images/ipp.png";

const Partners = () => {
  const partners = [
    { name: "IDP", logo: idp },
    { name: "British Council", logo: BritishCouncil },
    { name: "IPT IELTS", logo: ipt },
    // Thêm các đối tác khác nếu muốn
    { name: "IDP", logo: idp },
    { name: "British Council", logo: BritishCouncil },
  ];

  // Lặp lại mảng partners để tạo hiệu ứng marquee mượt mà
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === THAY ĐỔI Ở DÒNG DƯỚI: Thêm 'leading-snug' === */}
        <h2 className="text-center text-3xl md:text-5xl font-bold text-blue-950 mb-12 leading-snug">
          Accompanied by the most prestigious educational institutions in Vietnam
        </h2>

        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:pause-animation space-x-10 py-4">
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-56 h-32 flex-shrink-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-30 object-contain transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;