import { Button, Card, Typography, Row, Col, Tabs } from "antd"
import {
  ArrowLeftOutlined, BookOutlined, CheckCircleFilled,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  CrownOutlined,
  EyeFilled,
  MinusOutlined,
  PercentageOutlined,
  UserOutlined
} from '@ant-design/icons';
import BoxComment from "../../components/tests/BoxComment";
import RightSider from "../../components/tests/RightSider"
import SectionAnswer from "../../components/tests/SectionAnswer";

const AfterTestPage = () => {
  const { Text } = Typography;
  const onChange = (key) => {
    console.log(key);
  };

  const cols = [
    {
      "icon": <CheckCircleFilled className="!text-green-400" />,
      "content": "200/200",
      "tag": "Số câu đúng",
      "bgColor": "bg-green-50",
      "tColor": "text-green-600"
    },
    {
      "icon": <PercentageOutlined className="!text-blue-400" />,
      "content": "100%",
      "tag": "Độ chính xác",
      "bgColor": "bg-blue-50",
      "tColor": "text-blue-600"
    },
    {
      "icon": <ClockCircleOutlined className="!text-purple-400" />,
      "content": "1:55;07",
      "tag": "Thời gian hoàn thành",
      "bgColor": "bg-purple-50",
      "tColor": "text-purple-600"
    },
    {
      "icon": <CheckOutlined className="!text-green-400" />,
      "content": "200",
      "tag": "Trả lời đúng",
      "bgColor": "bg-green-50",
      "tColor": "text-green-600"
    },
    {
      "icon": <CloseOutlined className="!text-red-400" />,
      "content": "0",
      "tag": "Trả lời sai",
      "bgColor": "bg-red-50",
      "tColor": "text-red-600"
    },
    {
      "icon": <MinusOutlined />,
      "content": "0",
      "tag": "Bỏ qua",
      "bgColor": "bg-gray-50",
      "tColor": "text-gray-600"
    },

  ];

  const ColContent = ({ icon, content, tag, bgColor, tColor }) => {
    return (
      <Col span={8}>
        <div className={`${bgColor} rounded-lg p-4 text-center }`}>
          {icon}
          <div className={`text-2xl font-bold ${tColor}`}>{content}</div>
          <div className="text-sm text-gray-600">{tag}</div>
        </div>
      </Col>
    )
  };

  const handleScroll = () => {
    document.getElementById("my-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50">

      {/* main  */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-7 ">

            {/* Conclude */}

            <Card className="!shadow-lg !pb-3">
              <div className="flex justify-between items-center mb-4 flex-col md:flex-row md:gap-0 gap-3">
                <h1 className="text-2xl font-bold text-gray-800">Kết Quả Bài Làm - New Economy TOEIC Test 10</h1>
                <div className="flex space-x-3">
                  <Button icon={<ArrowLeftOutlined />} size="middle">
                    <span className="text-gray-700">Quay lại danh sách</span>
                  </Button>
                  <Button icon={<EyeFilled />} size="middle" type="primary" onClick={handleScroll} >
                    <span>Xem đáp án</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Overall */}

            <Card className="!shadow-lg !pb-3 !mt-7">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <CrownOutlined className="text-4xl !text-yellow-300" />
                  <h2 className="text-4xl font-bold text-gray-800">990/990</h2>
                </div>
                <p className="text-lg text-gray-600">Điểm TOEIC</p>
              </div>

              <Row gutter={[16, 16]}>
                {cols.map((col, index) => {
                  return (
                    <ColContent key={index} icon={col.icon} content={col.content} tag={col.tag} bgColor={col.bgColor} tColor={col.tColor} />
                  )
                })}
              </Row>
            </Card>

            <Card className="!shadow-lg !pb-3 !mt-7">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Điểm chi tiết theo kỹ năng</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <UserOutlined className="text-2xl !text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Listening</h4>
                      <div className="text-2xl font-bold text-blue-600">495/495</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">100%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <BookOutlined className="text-2xl !text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Listening</h4>
                      <div className="text-2xl font-bold text-green-600">495/495</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">90%</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section answer */}
            <SectionAnswer />

            {/* comment */}
            <BoxComment />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <RightSider />
          </div>

        </div>
      </div>





    </div>
  )
}
export default AfterTestPage