// src/components/admin/SiderMenuContent.jsx
import React from 'react';
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FaGraduationCap } from "react-icons/fa";
import { FaEarlybirds } from 'react-icons/fa6';

const { ItemGroup, Item } = Menu;

// Logo Section (Giữ nguyên chiều cao 64px)
const LogoSection = ({ collapsed }) => (
  <Link
    to="/admin"
    className="flex gap-3 justify-center items-center overflow-hidden"
    style={{ height: '64px' }} // <-- Giữ nguyên 64px
  >
    <FaEarlybirds className="text-4xl text-blue-500 flex-shrink-0" />
    {!collapsed && (
      <div className="text-black text-2xl font-bold whitespace-nowrap">
        Lingo
      </div>
    )}
  </Link>
);

// Mảng chứa tất cả các đường dẫn key để xử lý selectedKey
const allMenuKeys = [
  "/admin",
  "/admin/tests",
  "/admin/create-test",
  "/admin/question-bank",
  "/admin/users",
  "/admin/analytics",
  "/admin/settings"
];

// Component chính chứa Menu
const SiderMenuContent = ({ collapsed, onMenuClick }) => {
  const location = useLocation();

  const selectedKey = allMenuKeys
    .filter(key => location.pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0] || "/admin";

  return (
    // Padding p-4 cho nội dung bên trong Sider/Drawer
    <div className="p-4 flex flex-col h-full">
      <LogoSection collapsed={collapsed} />

      <div className="mt-4">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="custom-admin-menu"
          onClick={onMenuClick}
          items={[
            {
              type: "group",
              key: "g_nav",
              label: "Điều hướng",
              children: [
                {
                  key: "/admin",
                  icon: <DashboardOutlined />,
                  label: <Link to="/admin">Dashboard</Link>,
                },
              ],
            },
            {
              type: "group",
              key: "g_exam",
              label: "Quản lý thi",
              children: [
                {
                  key: "/admin/tests",
                  icon: <UnorderedListOutlined />,
                  label: <Link to="/admin/tests">Danh sách bài thi</Link>,
                },
                {
                  key: "/admin/create-test",
                  icon: <AppstoreAddOutlined />,
                  label: <Link to="/admin/create-test">Tạo bài thi mới</Link>,
                },
                {
                  key: "/admin/question-bank",
                  icon: <QuestionCircleOutlined />,
                  label: <Link to="/admin/question-bank">Ngân hàng câu hỏi</Link>,
                },
              ],
            },
            {
              type: "group",
              key: "g_system",
              label: "Hệ thống",
              children: [
                {
                  key: "/admin/users",
                  icon: <TeamOutlined />,
                  label: <Link to="/admin/users">Quản lý người dùng</Link>,
                },
                {
                  key: "/admin/analytics",
                  icon: <BarChartOutlined />,
                  label: <Link to="/admin/analytics">Thống kê & Báo cáo</Link>,
                },
                {
                  key: "/admin/settings",
                  icon: <SettingOutlined />,
                  label: <Link to="/admin/settings">Cài đặt chung</Link>,
                },
              ],
            },
          ]}
        />

      </div>
    </div>
  );
};

export default SiderMenuContent;