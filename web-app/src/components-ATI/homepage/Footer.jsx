// src/components/Footer.jsx
import React from "react";
// Import icons (giả sử bạn đã cài lucide-react)
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom"; // Dùng Link cho logo

const Footer = () => {
  return (
    // === THAY ĐỔI 1: Đổi nền sang màu Navy đậm (blue-950) ===
    <footer className="bg-blue-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-blue-400 mb-4 inline-block">
              Prep<span className="text-white">IELTS</span>
            </Link>
            {/* === THAY ĐỔI 2: Dịch sang Tiếng Anh === */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Vietnam's leading online IELTS preparation platform with effective
              learning methods and a professional team of instructors.
            </p>
            {/* Thêm social media icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            {/* === THAY ĐỔI 2: Dịch sang Tiếng Anh === */}
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mock Tests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            {/* === THAY ĐỔI 2: Dịch sang Tiếng Anh === */}
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail size={16} /> info@prepielts.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> 1900 1234
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> 123 ABC Street, D1, HCMC
              </li>
            </ul>
          </div>
        </div>

        {/* === THAY ĐỔI 3: Đổi màu border === */}
        <div className="border-t border-blue-900 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Prep IELTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;