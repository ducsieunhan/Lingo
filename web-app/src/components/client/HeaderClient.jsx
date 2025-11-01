import {
    Avatar,
    Button,
    Card,
    Dropdown,
    Layout,
    List,
    Menu,
    Space,
    Spin,
    Tag,
    Typography
} from "antd";
const { Header, Sider, Content } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import { FaChartArea, FaChartLine, FaClipboard, FaSun } from "react-icons/fa";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi";
import { FaEarlybirds } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    TrophyOutlined,
    CheckCircleOutlined,
    FireOutlined,
    UserOutlined,
    SettingOutlined,
    CrownOutlined,
    QuestionCircleOutlined,
    LogoutOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { logout } from "../../slice/authentication";
import Announce from "../share/Announce";


const { Text } = Typography;

const HeaderClient = () => {

    const { user, loading } = useSelector((state) => state.authentication);
    const userName = user?.email;
    const clientId = user?.sub;
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout(clientId)).unwrap();
            // navigate(location.pathname);
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    const menuU = (
        <Menu
            onClick={({ key }) => {
                if (key === "logout") handleLogout();
            }}
            items={[
                {
                    key: "profile",
                    icon: <UserOutlined />,
                    // label: "Trang cá nhân",
                    label: <Link to={"/profile"}>Trang cá nhân</Link>
                },
                {
                    key: "settings",
                    icon: <SettingOutlined />,
                    label: "Cài đặt",
                },
                {
                    key: "premium",
                    icon: <CrownOutlined />,
                    label: "Nâng cấp Premium",
                },
                {
                    key: "help",
                    icon: <QuestionCircleOutlined />,
                    label: "Trợ giúp",
                },
                {
                    type: "divider",
                },
                {
                    key: "logout",
                    icon: <LogoutOutlined style={{ color: "red" }} />,
                    // label: <span style={{ color: "red" }} onClick={handleLogout}>Đăng xuất</span>,
                    label: <span style={{ color: "red" }}>Đăng xuất</span>,
                },
            ]}
        />
    );

    // if (loading) return <Spin spinning={loading} />

    return (
        <Header style={{ backgroundColor: 'white' }} className="!shadow-xl !px-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8 h-full">
                        <Link className="flex items-center space-x-3" to={"/"}>
                            <div className="w-10 h-10 bg-gradient-to-br bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                <FaEarlybirds className="text-[#ffffff] text-2xl" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold font-mono bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                                    Lingo
                                </span>
                            </div>
                        </Link>
                        <nav className="hidden lg:flex space-x-2 m-1 h-1/2">
                            <Link to={"/tests"} className={`${location.pathname === '/tests' ? "!text-blue-600 !bg-blue-50 !rounded-lg" : "!text-gray-700 hover:!text-blue-600"} 
                                flex items-center justify-center h-full p-3` }>
                                <FaClipboard className="mr-2 text-sm" />
                                Đề thi online
                            </Link>
                            <Link to={"/analytics"} className={`${location.pathname === '/analytics' ? "!text-blue-600 !bg-blue-50 !rounded-lg" : "!text-gray-700 hover:!text-blue-600"} 
                                flex items-center justify-center h-full p-2` }>
                                <FaChartLine className="mr-2 text-sm" />
                                Thống kê điểm
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-3">
                        {!userName ? <Link to={"/auth/login"} variant="text" color="primary" size="large" type="text">Đăng nhập</Link> : <>
                            <Announce />

                            <Dropdown overlay={menuU} trigger={['click']} placement="bottomRight">
                                <Button type="text" className="flex items-center space-x-2">
                                    <Avatar
                                        className="!bg-gradient-to-r !from-blue-400 !to-blue-500"
                                        icon={!user?.avatar && <UserOutlined />} src={user?.avatar}
                                    />
                                    <div className="hidden md:block text-left">
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {userName}
                                        </Text>
                                    </div>
                                    <DownOutlined style={{ color: "#9ca3af", fontSize: 12 }} />
                                </Button>
                            </Dropdown>
                        </>}
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default HeaderClient;