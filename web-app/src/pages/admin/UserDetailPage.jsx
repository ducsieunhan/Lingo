import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Badge,
  Typography,
  Button,
  Space
} from 'antd';
import { retrieveAttempts } from "../../slice/attempts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HistoryAttempt from "../../components/client/userInfo/HistoryAttempt";

const { Title, Text } = Typography;

// Định dạng ngày giờ cho dễ đọc
const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const UserDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = location?.state?.user;

  useEffect(() => {
    dispatch(retrieveAttempts(id));
  }, [id, dispatch])

  if (!user) {
    return (
      <Card>
        <Text type="danger">Không tìm thấy thông tin người dùng.</Text>
        <br />
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          style={{ marginTop: 16 }}
        >
          Quay lại
        </Button>
      </Card>
    )
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Title level={3}>Chi tiết người dùng: {user.username}</Title>

      {/* --- Thông tin cá nhân --- */}
      <Card>
        <Descriptions
          title="Thông tin cá nhân"
          bordered
          column={1} // Hiển thị 1 cột
        >
          <Descriptions.Item label="Họ (First Name)">
            {user.firstName || 'Chưa cập nhật'}
          </Descriptions.Item>

          <Descriptions.Item label="Tên (Last Name)">
            {user.lastName || 'Chưa cập nhật'}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            {user.phone || 'Chưa cập nhật'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* --- Thông tin hệ thống --- */}
      <Card>
        <Descriptions
          title="Thông tin hệ thống"
          bordered
          column={1}
        >
          <Descriptions.Item label="Username">
            {user.username}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            {user.enable ?
              <Badge status="success" text="Hoạt động" /> :
              <Badge status="error" text="Vô hiệu hóa" />
            }
          </Descriptions.Item>

          <Descriptions.Item label="Vai trò (Roles)">
            {user.roles?.length > 0 ?
              user.roles.map(role => (
                <Tag color="blue" key={role}>{role.toUpperCase()}</Tag>
              )) :
              'Không có vai trò'
            }
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo tài khoản">
            {formatDateTime(user.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>


      <Card>
        <HistoryAttempt />
      </Card>

      <Button onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </Space>
  )
}

export default UserDetailPage;