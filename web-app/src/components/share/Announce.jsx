import { CheckCircleOutlined, FireOutlined, TrophyOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Dropdown, List } from "antd"
import { useState } from "react";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi"

const Announce = () => {
  const [openAnnounce, setOpenAnnouce] = useState(false);
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


  return (
    <Dropdown overlay={menu} trigger={['click']} open={openAnnounce}
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
  )
}
export default Announce