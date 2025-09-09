import React from 'react';
import {
    Layout,
    Menu
} from "antd";
import {
    FileAddOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    BarChartOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const SideAdmin = ({ collapsed, setCollapsed }) => {

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="!bg-[#0F172A] !fixed left-0 h-[100vh] z-50 pt-5"
        >

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    { key: "1", icon: <FileAddOutlined />, label: "Tạo bài thi" },
                    { key: "2", icon: <UnorderedListOutlined />, label: "Danh sách bài thi" },
                    { key: "3", icon: <TeamOutlined />, label: "Quản lý học viên" },
                    { key: "4", icon: <BarChartOutlined />, label: "Thống kê" },
                    { key: "5", icon: <SettingOutlined />, label: "Cài đặt" },
                ]}
            />
        </Sider>
    );
};

export default SideAdmin;