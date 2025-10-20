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
          className="custom-admin-menu" //
          // Thêm onClick để đóng Drawer khi chọn item (trên mobile)
          onClick={onMenuClick}
        >
          {/* --- Các ItemGroup và Item (Giữ nguyên như cũ) --- */}
          <ItemGroup key="g_nav" title="Điều hướng">
            <Item key="/admin" icon={<DashboardOutlined />}>
              <Link to="/admin">Dashboard</Link>
            </Item>
          </ItemGroup>
          <ItemGroup key="g_exam" title="Quản lý thi">
            <Item key="/admin/tests" icon={<UnorderedListOutlined />}>
              <Link to="/admin/tests">Danh sách bài thi</Link>
            </Item>
            <Item key="/admin/create-test" icon={<AppstoreAddOutlined />}>
              <Link to="/admin/create-test">Tạo bài thi mới</Link>
            </Item>
            <Item key="/admin/question-bank" icon={<QuestionCircleOutlined />}>
              <Link to="/admin/question-bank">Ngân hàng câu hỏi</Link>
            </Item>
          </ItemGroup>
          <ItemGroup key="g_system" title="Hệ thống">
            <Item key="/admin/users" icon={<TeamOutlined />}>
              <Link to="/admin/users">Quản lý người dùng</Link>
            </Item>
            <Item key="/admin/analytics" icon={<BarChartOutlined />}>
              <Link to="/admin/analytics">Thống kê & Báo cáo</Link>
            </Item>
            <Item key="/admin/settings" icon={<SettingOutlined />}>
              <Link to="/admin/settings">Cài đặt chung</Link>
            </Item>
          </ItemGroup>
        </Menu>
      </div>
    </div>
  );
};

export default SiderMenuContent;