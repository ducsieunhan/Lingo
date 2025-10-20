// src/layouts/AdminLayout.jsx
import { useState } from "react";
// THÊM: Import Grid và Drawer
import { Layout, Grid, Drawer } from "antd";
import { Outlet } from "react-router-dom";

import HeaderAdmin from "../components/admin/HeaderAdmin";
import SideAdmin from "../components/admin/SideAdmin";
import DynamicBreadcrumb from "../components/admin/DynamicBreadcrumb";
// THÊM: Import menu content
import SiderMenuContent from "../components/admin/SiderMenuContent";

const { Content } = Layout;
const { useBreakpoint } = Grid; // Hook để detect màn hình

// Giữ nguyên các hằng số với chiều cao 64px
const SIDER_WIDTH = 250;
const SIDER_WIDTH_COLLAPSED = 80;
const HEADER_HEIGHT = 64; // <-- Giữ nguyên 64px

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false); // State cho Sider (Desktop)
    const [drawerVisible, setDrawerVisible] = useState(false); // State cho Drawer (Mobile)

    const screens = useBreakpoint();
    const isDesktop = !!screens.md; // md (768px) là breakpoint chuẩn

    // Margin của content: có margin trên desktop, 0 trên mobile
    const contentMarginLeft = isDesktop ? (collapsed ? SIDER_WIDTH_COLLAPSED : SIDER_WIDTH) : 0;

    // Hàm toggle chung: xử lý Sider hoặc Drawer tùy màn hình
    const handleToggle = () => {
        if (isDesktop) {
            setCollapsed(!collapsed);
        } else {
            setDrawerVisible(!drawerVisible);
        }
    };

    // Hàm đóng Drawer (truyền cho SiderMenuContent)
    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                backgroundColor: '#fcfcfc' //
            }}
        >

            {/* SIDER (DESKTOP): Chỉ hiển thị trên màn hình md trở lên */}
            {isDesktop && (
                <SideAdmin
                    collapsed={collapsed}
                    width={SIDER_WIDTH}
                    collapsedWidth={SIDER_WIDTH_COLLAPSED}
                />
            )}

            {/* DRAWER (MOBILE): Chỉ hiển thị dưới màn hình md */}
            {!isDesktop && (
                <Drawer
                    placement="left"
                    onClose={closeDrawer}
                    open={drawerVisible}
                    closable={false}
                    bodyStyle={{ padding: 0 }} // Reset padding để menu vừa khít
                    width={SIDER_WIDTH}
                    zIndex={1002} // Đảm bảo Drawer đè lên Header
                >
                    {/* Tái sử dụng Menu Content, luôn ở trạng thái "không thu gọn" */}
                    <SiderMenuContent collapsed={false} onMenuClick={closeDrawer} />
                </Drawer>
            )}

            {/* MAIN LAYOUT (Header + Content) */}
            <Layout
                className="transition-all duration-300"
                style={{
                    marginLeft: contentMarginLeft, // Áp dụng margin
                    backgroundColor: 'transparent'
                }}
            >

                <HeaderAdmin
                    isDesktop={isDesktop} // Prop mới
                    collapsed={collapsed}
                    onToggle={handleToggle} // Prop mới
                    height={HEADER_HEIGHT}
                    siderWidth={SIDER_WIDTH}
                    siderCollapsedWidth={SIDER_WIDTH_COLLAPSED}
                />

                <Content
                    className="p-8 bg-transparent" //
                    style={{
                        marginTop: HEADER_HEIGHT,
                        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    }}
                >
                    <DynamicBreadcrumb />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}