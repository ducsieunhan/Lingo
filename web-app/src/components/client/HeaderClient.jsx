import {
    Avatar,
    Button,
    Card,
    Dropdown,
    Layout,
    List,
    Menu,
    Space,
    Tag,
    Typography
} from "antd";
const { Header, Sider, Content } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import { FaChartArea, FaChartLine, FaClipboard, FaSun } from "react-icons/fa";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi";
import { FaEarlybirds } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom"
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


const { Text } = Typography;

const notifications = [
    {
        id: 1,
        title: "Chúc mừng! Bạn đã đạt điểm cao mới",
        description: "IELTS Reading - 8.5/9.0",
        time: "2 giờ trước",
        icon: <TrophyOutlined style={{ color: "#1d4ed8" }} />,
        bg: "#dbeafe",
        borderColor: "#3b82f6",
    },
    {
        id: 2,
        title: "Bài thi mới đã được thêm",
        description: "TOEIC Listening Practice Test 2024",
        time: "1 ngày trước",
        icon: <CheckCircleOutlined style={{ color: "#16a34a" }} />,
        bg: "#dcfce7",
        borderColor: "#22c55e",
    },
    {
        id: 3,
        title: "Streak 15 ngày!",
        description: "Tiếp tục duy trì để nhận thưởng",
        time: "2 ngày trước",
        icon: <FireOutlined style={{ color: "#ea580c" }} />,
        bg: "#ffedd5",
        borderColor: "#f97316",
    },
];


const HeaderClient = () => {

    const { user } = useSelector((state) => state.authentication);
    const userName = user?.email;
    const clientId = user?.sub;

    const [openAnnounce, setOpenAnnouce] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await dispatch(logout(clientId)).unwrap();
        window.location.reload();
    }


    const menu = (
        <Card
            title="Thông báo"
            extra={<span>Bạn có 3 thông báo mới</span>}
            style={{ width: 320 }}
            bodyStyle={{ padding: 0 }}
        >
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            borderLeft: `4px solid ${item.borderColor}`,
                            padding: "12px 16px",
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{ backgroundColor: item.bg }}
                                    icon={item.icon}
                                    size={32}
                                />
                            }
                            title={<span style={{ fontWeight: 500 }}>{item.title}</span>}
                            description={
                                <>
                                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                                        {item.description}
                                    </div>
                                    <div style={{ fontSize: 12, color: item.borderColor }}>
                                        {item.time}
                                    </div>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
            <div style={{ borderTop: "1px solid #f3f4f6", padding: "8px 16px" }}>
                <Button type="link" block>
                    Xem tất cả thông báo
                </Button>
            </div>
        </Card>
    );

    const menuU = (
        <Menu
            items={[
                {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: "Trang cá nhân",
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
                    label: <span style={{ color: "red" }} onClick={handleLogout}>Đăng xuất</span>,
                },
            ]}
        />
    );



    return (
        <Header style={{ backgroundColor: 'white' }} className="!shadow-md !px-0">
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
                            <Link href="#" className={`${location.pathname === '/analytics' ? "!text-blue-600 !bg-blue-50 !rounded-lg" : "!text-gray-700 hover:!text-blue-600"} 
                                flex items-center justify-center h-full p-2` }>
                                <FaChartLine className="mr-2 text-sm" />
                                Thống kê điểm
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-3">
                        {!userName ? <Link to={"/auth/login"} variant="text" color="primary" size="large" type="text">Đăng nhập</Link> : <>
                            <Dropdown menu={{ menu }} trigger={['click']} open={openAnnounce}
                                onOpenChange={(nextOpen) => setOpenAnnouce(nextOpen)} placement={`${window.innerWidth < 485 ? 'bottomCenter' : 'bottomRight'}`}
                            >
                                <Button
                                    type="text"
                                    icon={openAnnounce ? (
                                        <BiSolidBellRing className="text-xl !text-blue-400 !transition-colors !duration-1000 !ease-in" />
                                    ) : (
                                        <BiSolidBell className="text-xl !text-gray-500 !transition-colors !duration-1000 !ease-in" />
                                    )}
                                ></Button>
                            </Dropdown>

                            <Dropdown overlay={menuU} trigger={['click']} placement="bottomRight">
                                <Button type="text" className="flex items-center space-x-2">
                                    <Avatar
                                        className="!bg-gradient-to-r !from-blue-400 !to-blue-500" icon={<UserOutlined />}
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