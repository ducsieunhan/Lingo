import { Button, Card, Input, Select } from "antd";
import SingleComment from "./SingleComment";

const BoxComment = () => {
  const { TextArea } = Input;
  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  const comments = [
    {
      id: 1,
      author: "Nguyễn Thị Lan",
      time: "2 giờ trước",
      content: "Bài test này khá hay...",
      likes: 12,
      dislikes: 2,
      replies: [
        {
          id: 2,
          author: "Nguyễn Văn A",
          time: "1 giờ trước",
          content: "Mình cũng thấy vậy!",
          likes: 5,
          dislikes: 0,
          replies: [
            {
              id: 3,
              author: "Nguyễn Văn A",
              time: "1 giờ trước",
              content: "Mình cũng thấy vậy!",
              likes: 5,
              dislikes: 0,
              replies: []
            }
          ]
        },
        {
          id: 4,
          author: "Nguyễn Văn A",
          time: "1 giờ trước",
          content: "Mình cũng thấy vậy!",
          likes: 5,
          dislikes: 0,
          replies: [
            {
              id: 5,
              author: "Nguyễn Văn A",
              time: "1 giờ trước",
              content: "Mình cũng thấy vậy!",
              likes: 5,
              dislikes: 0,
              replies: []
            }
          ]
        }
      ]
    }
  ];

  return (
    <Card className="!shadow-lg !pb-3 !mt-7">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Bình luận (24)</h2>
        <div className="flex items-center space-x-2">
          <Select
            defaultValue="Mới nhất"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: 'newest', label: 'Mới nhất' },
              { value: 'populate', label: 'Phổ biến nhất' },
              { value: 'likest', label: 'Nhiều tương tác nhất' },
            ]}
          />
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <TextArea rows={4} placeholder="Chia sẻ kinh nghiệm của bạn về bài test này..." />
        <div className="flex justify-end mt-3">
          <Button color="primary" variant="solid">
            Đăng bình luận
          </Button>
        </div>
      </div>

      <div className="space-y-6 ">
        {comments.map(comment => (
          <SingleComment key={comment.id} {...comment} level={1} />
        ))}
      </div>

    </Card>
  )
}
export default BoxComment