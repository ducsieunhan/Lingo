import { CheckCircleOutlined, CloseOutlined, FireOutlined, TrophyOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Dropdown, List, Spin } from "antd" // Thêm Spin
import { useEffect, useState } from "react";
import { BiSolidBell, BiSolidBellRing } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { markNotificationAsRead, removeNotification, retrieveUserNotifications } from "../../slice/notifications";

const formatTimeAgo = (isoString) => {
  const now = new Date();
  const date = new Date(isoString);
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000; // Năm
  if (interval > 1) return Math.floor(interval) + " năm trước";
  interval = seconds / 2592000; // Tháng
  if (interval > 1) return Math.floor(interval) + " tháng trước";
  interval = seconds / 86400; // Ngày
  if (interval > 1) return Math.floor(interval) + " ngày trước";
  interval = seconds / 3600; // Giờ
  if (interval > 1) return Math.floor(interval) + " giờ trước";
  interval = seconds / 60; // Phút
  if (interval > 1) return Math.floor(interval) + " phút trước";
  return "Vừa xong";
};

const MAX_ITEMS_DEFAULT = 5;

const Announce = () => {
  const [openAnnounce, setOpenAnnouce] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);
  const { user } = useSelector((state) => state.authentication);
  const accountId = user?.sub;

  useEffect(() => {
    if (openAnnounce && accountId) {
      dispatch(retrieveUserNotifications(accountId));
    }
  }, [dispatch, accountId, openAnnounce]);

  const handleMarkAsReadClick = (e, notiId) => {
    dispatch(markNotificationAsRead(notiId));
  };

  const handleRemoveNotification = (e, notiId) => {
    dispatch(removeNotification(notiId));
  };

  const handleOpenChange = (nextOpen) => {
    setOpenAnnouce(nextOpen);
    if (!nextOpen) {
      setIsExpanded(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  const displayedNotifications = isExpanded
    ? notifications
    : notifications.slice(0, MAX_ITEMS_DEFAULT);

  const menu = (
    <Card
      title="Notification"
      extra={<span>You have {unreadCount} new notifications</span>}
      style={{ width: 320 }}
      bodyStyle={{ padding: 0, maxHeight: 500, overflowY: 'auto' }}
    >
      {loading && <Spin style={{ padding: '20px 0', width: '100%' }} />}
      {!loading && (
        <List
          itemLayout="horizontal"
          dataSource={displayedNotifications}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "12px 16px",
                backgroundColor: item.read ? "#f9fafb" : "#ffffff",
                transition: "background-color 0.2s",
                cursor: "pointer",
              }}
              actions={[
                !item.read && (
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    title="Đánh dấu đã đọc"
                    icon={<CheckCircleOutlined style={{ fontSize: 14, color: '#22c55e' }} />}
                    onClick={(e) => handleMarkAsReadClick(e, item.id)}
                  />
                ),
                <Button
                  type="text"
                  shape="circle"
                  danger
                  size="small"
                  title="Xóa thông báo"
                  icon={<CloseOutlined style={{ fontSize: 12 }} />}
                  onClick={(e) => handleRemoveNotification(e, item.id)}
                />
              ]}
            >
              <List.Item.Meta
                title={
                  <span style={{ fontWeight: item.read ? 400 : 600 }}>
                    {item.title}
                  </span>
                }
                description={
                  <>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>
                      {item.message}
                    </div>
                    <div style={{ fontSize: 12, color: "#3b82f6", fontWeight: 500, marginTop: '4px' }}>
                      {formatTimeAgo(item.createdAt)}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
      {totalCount > MAX_ITEMS_DEFAULT && (
        <div style={{ borderTop: "1px solid #f3f4f6", padding: "8px 16px" }}>
          <Button
            type="link"
            block
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Thu gọn" : `Xem tất cả ${totalCount} thông báo`}
          </Button>
        </div>
      )}
    </Card>
  );


  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      open={openAnnounce}
      onOpenChange={handleOpenChange}
      placement={`${window.innerWidth < 485 ? 'bottomCenter' : 'bottomRight'}`}
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
export default Announce;