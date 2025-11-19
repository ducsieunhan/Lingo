import { Avatar, Button, Card } from "antd"
import { CustomerServiceOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const RightSider = () => {
  const { user } = useSelector((state) => state.authentication);
  const navigate = useNavigate();


  const Recommend = (content) => {
    return (
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <CustomerServiceOutlined className=" !text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">TOEIC Listening Test 2</div>
          <div className="text-xs text-gray-600">Phù hợp với trình độ của bạn</div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Card className="!shadow-lg !pb-3">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="!bg-red-500" icon={<UserOutlined />} />
          <div>
            <h3 className="font-semibold text-gray-900">{user?.preferred_username}</h3>
            <p className="text-sm text-gray-600">Level 12 • 2,450 XP</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Tiến độ tuần này</span>
            <span className="font-medium">7/10 bài</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 mt-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">28</div>
              <div className="text-xs text-gray-600">Bài đã làm</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">750</div>
              <div className="text-xs text-gray-600">Điểm cao nhất</div>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <StarFilled className="!text-gray-100" />
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <StarFilled className="!text-gray-100" />
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <StarFilled className="!text-gray-100" />
            </div>
          </div>
          <Button block color="primary" variant="solid" size="large" onClick={() => navigate("/analytics")}>
            Xem thống kê
          </Button>
        </div>
      </Card>

      <Card className="!shadow-lg !pb-3 !mt-7">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Đề xuất cho bạn</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Recommend key={i} />
          ))}
        </div>
      </Card>
    </>
  )
}
export default RightSider