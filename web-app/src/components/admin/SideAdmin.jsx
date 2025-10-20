// src/components/admin/SideAdmin.jsx
import React from 'react';
import { Layout } from "antd";
// THAY ĐỔI: Import SiderMenuContent
import SiderMenuContent from './SiderMenuContent';

const { Sider } = Layout;

const SideAdmin = ({ collapsed, width, collapsedWidth }) => {
    return (
        <Sider
            trigger={null}
            collapsible={false}
            collapsed={collapsed}
            width={width}
            collapsedWidth={collapsedWidth}
            className="!bg-white admin-sider" //
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1001,
            }}
        >
            {/* THAY ĐỔI: Toàn bộ nội dung Sider giờ được quản lý bởi SiderMenuContent */}
            <SiderMenuContent collapsed={collapsed} />
        </Sider>
    );
};

export default SideAdmin;