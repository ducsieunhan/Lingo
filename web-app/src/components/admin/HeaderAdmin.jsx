// src/components/admin/HeaderAdmin.jsx
import React from 'react';
import { Layout, Button, Avatar, Badge, Popover, Menu } from "antd";
import { Link } from "react-router-dom";
import { FaBell, FaGraduationCap } from "react-icons/fa";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuOutlined, // <-- THÊM: Icon Hamburger cho mobile
} from "@ant-design/icons";

const { Header } = Layout;

// ProfileMenuContent (Giữ nguyên từ trước)
const ProfileMenuContent = () => (
    <div className="w-40">
        <Menu mode="vertical" className="!border-none">
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Hồ sơ
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
                Đăng xuất
            </Menu.Item>
        </Menu>
    </div>
);

const HeaderAdmin = ({
    isDesktop, // Prop mới từ AdminLayout
    collapsed,
    onToggle, // Prop mới, thay cho setCollapsed
    height,
    siderWidth,
    siderCollapsedWidth
}) => {

    // Chiều rộng header: 100% trên mobile, co dãn trên desktop
    const headerWidth = isDesktop
        ? `calc(100% - ${collapsed ? siderCollapsedWidth : siderWidth}px)`
        : '100%';

    // Chọn icon toggle dựa trên màn hình
    let toggleIcon;
    if (isDesktop) {
        toggleIcon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
    } else {
        toggleIcon = <MenuOutlined />; // Luôn là icon hamburger trên mobile
    }

    return (
        <Header
            className="!bg-white !p-0 !px-6 flex justify-between items-center admin-header" //
            style={{
                position: 'fixed',
                zIndex: 1000,
                width: headerWidth,
                height: height, // Giữ nguyên 64px
                lineHeight: `${height}px`, // Giữ nguyên 64px
                transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s',
            }}
        >
            {/* Bên trái Header: Nút Toggle */}
            <div className="flex items-center">
                <Button
                    type="text"
                    icon={toggleIcon}
                    onClick={onToggle} // Gọi hàm toggle chung
                    className="admin-header-toggle" //
                />

                {/* Chỉ hiển thị logo nhỏ khi Sider thu gọn VÀ đang ở desktop */}
                {isDesktop && collapsed && (
                    <Link to="/admin" className="flex gap-2 justify-center items-center ml-4">
                        {/* <FaGraduationCap className="text-4xl text-blue-500" /> */}
                    </Link>
                )}
            </div>

            {/* Bên phải Header (Giữ nguyên từ trước) */}
            <div className="flex items-center gap-6">
                <Badge count={3} size="small">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<FaBell className="text-lg" />}
                        className="!w-10 !h-10 hover:!bg-gray-100"
                    />
                </Badge>
                <Popover
                    content={<ProfileMenuContent />}
                    trigger="click"
                    placement="bottomRight"
                    overlayClassName="!p-0"
                >
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
                        <Avatar size="large" className="!bg-blue-500">
                            Admin
                        </Avatar>
                        <div className="flex-col leading-tight text-right hidden md:flex">
                            <span className="font-medium">Nguyễn Văn Admin</span>
                            <span className=" text-gray-600 text-sm">Quản trị viên</span>
                        </div>
                    </div>
                </Popover>
            </div>
        </Header>
    );
};

export default HeaderAdmin;