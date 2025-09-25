import { Button, Card, Select, Space, Tag, Typography, Input, Avatar } from "antd"
import Brc from "../BreadCum"
import { BookFilled, BulbFilled, CaretRightFilled, ClockCircleFilled, ClockCircleOutlined, CommentOutlined, CustomerServiceOutlined, DislikeFilled, ExclamationCircleOutlined, EyeFilled, HeartOutlined, LikeFilled, PlayCircleFilled, QuestionCircleFilled, QuestionCircleOutlined, ReadFilled, ReadOutlined, ShareAltOutlined, StarFilled, TeamOutlined, ThunderboltOutlined, UnorderedListOutlined, UserOutlined, WechatFilled } from '@ant-design/icons';
import BoxComment from "../../components/tests/BoxComment";
import RightSider from "../../components/tests/RightSider";


const BeforeTestPage = () => {
  const { Text } = Typography;

  return (
    <div className="bg-gray-50">

      {/* breadcumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Brc value1="TOEIC" value2="Practice test 1" />
      </div>

      {/* main  */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-7 ">

            {/* action */}

            <Card className="!shadow-lg !pb-3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">#TOEIC</span>
                    <Button color="default" variant="text" >
                      <HeartOutlined className="text-xl text-shadow-gray-200" />
                    </Button>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">TOEIC Reading Practice Test 1</h1>
                  <Space size="large" className="text-sm text-gray-600">
                    <Text>
                      <ClockCircleFilled style={{ marginRight: 4 }} /> 75 phút
                    </Text>
                    <Text>
                      <QuestionCircleFilled style={{ marginRight: 4 }} /> 100 câu hỏi
                    </Text>
                    <Text>
                      <UnorderedListOutlined style={{ marginRight: 4 }} /> 3 phần thi
                    </Text>
                    <Text>
                      <WechatFilled style={{ marginRight: 4 }} /> 24 bình luận
                    </Text>
                    <Text>
                      <TeamOutlined style={{ marginRight: 4 }} /> 1,234 lượt làm
                    </Text>
                  </Space>
                </div>
                <Button color="default" variant="text" className="!px-0">
                  <ShareAltOutlined className="text-xl text-shadow-gray-200" />
                </Button>
              </div>

              <Card className="!bg-gradient-to-r !from-blue-50 !to-indigo-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng làm bài?</h3>
                    <p className="text-gray-600 text-sm mb-4">Đề thi mô phỏng chính thức TOEIC Reading với 100 câu hỏi trong 75 phút</p>
                    <div className="flex items-start space-x-4 flex-col md:flex-row md:items-center gap-3 md:gap-0">
                      <Button color="primary" variant="solid" size="large">
                        <CaretRightFilled className="text-xl text-shadow-gray-200" /> Bắt đầu làm bài
                      </Button>
                      <Button variant="solid" size="large" className="!bg-[FFFFFF]" >
                        <EyeFilled className="text-xl text-shadow-gray-200" /> Xem đáp án
                      </Button>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <ReadFilled className="text-3xl !text-blue-600" />
                    </div>
                  </div>
                </div>
                {/* <Tag icon={<ExclamationCircleOutlined />} color="warning" className="!mt-4 !py-2 !pr-3 !text-base text-nowrap">
                  <strong>Lưu ý:</strong> Hãy chuẩn bị đầy đủ 75 phút để hoàn thành bài thi. Bạn có thể tạm dừng và tiếp tục sau.
                </Tag> */}
                <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div class="flex items-center gap-1">
                    <BulbFilled className="!text-yellow-600" />
                    <div class="text-sm text-yellow-800">
                      <strong>Lưu ý:</strong> Hãy chuẩn bị đầy đủ 75 phút để hoàn thành bài thi. Bạn có thể tạm dừng và tiếp tục sau.
                    </div>
                  </div>
                </div>
              </Card>

            </Card>

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
export default BeforeTestPage