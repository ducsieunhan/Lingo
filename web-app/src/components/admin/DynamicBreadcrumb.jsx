// src/components/admin/DynamicBreadcrumb.jsx
import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

// Định nghĩa tên cho các đường dẫn
// Bạn có thể mở rộng map này khi thêm trang mới
const breadcrumbNameMap = {
  '/admin': 'Dashboard',
  '/admin/tests': 'Danh sách bài thi',
  '/admin/create-test': 'Tạo bài thi mới',
  '/admin/question-bank': 'Ngân hàng câu hỏi',
  '/admin/users': 'Quản lý người dùng',
  '/admin/analytics': 'Thống kê & Báo cáo',
  '/admin/settings': 'Cài đặt chung',
};

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  // Tạo breadcrumb items
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const name = breadcrumbNameMap[url];

    if (!name) return null; // Bỏ qua nếu không có tên

    const isLast = index === pathSnippets.length - 1;
    return (
      <Breadcrumb.Item key={url}>
        {isLast ? (
          // Mục cuối cùng là text
          <Typography.Text strong>{name}</Typography.Text>
        ) : (
          // Các mục trước là link
          <Link to={url}>{name}</Link>
        )}
      </Breadcrumb.Item>
    );
  }).filter(item => item !== null); // Lọc bỏ các item null

  // Luôn bắt đầu với trang chủ
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/admin">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  // Chỉ hiển thị breadcrumb nếu có nhiều hơn 1 mục (tức là không phải chỉ có trang chủ)
  if (breadcrumbItems.length <= 1) {
    return null; // Không hiển thị gì ở trang Dashboard
  }

  return (
    <Breadcrumb style={{ marginBottom: '24px' }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;