import { Avatar, Button } from "antd"
import { DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';


const SingleComment = ({ author, time, content, replies }) => {
  return (
    <div className="flex space-x-3 gap-1 ">
      <Avatar className="!bg-red-500" icon={<UserOutlined />} />
      <div className="flex-1 ">
        <div className=" rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">Nguyễn Thị Lan</span>
            <span className="text-xs text-gray-500">2 giờ trước</span>
          </div>
          <p className="text-gray-700 text-sm mb-3">Bài test này khá hay, đặc biệt là phần Part 7. Các câu hỏi inference khá khó nhưng rất bổ ích để luyện tập.</p>
          <div className="flex items-center  text-xs text-gray-500">
            <Button color="default" variant="text">
              <LikeFilled /> 12
            </Button>
            <Button color="default" variant="text">
              <DislikeFilled /> 12
            </Button>
            <Button color="default" variant="text">
              Trả lời
            </Button>
          </div>
        </div>
        {replies?.length > 0 && (
          <div className="ml-8 mt-2 space-y-2">
            {replies.map(reply => (
              <SingleComment key={reply.id} {...reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default SingleComment