import { useState } from "react";
import {
    Layout,
    Menu,
    Button,
    Input,
    Select,
    Upload,
    Form,
    Card,
    Progress,
    Image,
} from "antd";
import {
    FileAddOutlined,
    UnorderedListOutlined,
    TeamOutlined,
    BarChartOutlined,
    SettingOutlined,
    UploadOutlined,
    EyeOutlined,
    SaveOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
import { FaGraduationCap } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaBell } from "react-icons/fa";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    // document.querySelector(".css-dev-only-do-not-override-xepvsj").remove();
    return (
        <>
            <Header className="!bg-[#ffffff] !p-6 !pt-10 !pb-10 shadow-white drop-shadow-xl shadow flex justify-between items-center px-6 sticky top-0 z-50">
                <Link className="flex gap-2 justify-center items-center">
                    <FaGraduationCap className="text-6xl text-white bg-blue-500 p-1 rounded-xl" />
                    <div className="text-black text-2xl font-bold text-center py-4">
                        EduTest Admin
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <FaBell className="text-2xl relative" />
                        <span className="absolute top-[-5px] left-4 bg-red-500 text-white text-xs px-1 rounded-full">
                            3
                        </span>

                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col leading-tight">
                            <span className="font-medium ">Nguyễn Văn Admin</span>
                            <span className=" text-gray-600 text-sm self-end mr-1">Quản trị viên</span>
                        </div>

                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <p className="!text-[14px]">Admin</p>

                        </div>
                    </div>
                </div>
            </Header>
            <Layout className="min-h-screen mt-[10px]">
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

                {/* Main Layout */}
                <Layout
                    className={`transition-all duration-300 ${collapsed ? "ml-[80px]" : "ml-[200px]"
                        } `}
                >
                    <Content className="p-6 bg-[#f9fafb]">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>

    );
}
