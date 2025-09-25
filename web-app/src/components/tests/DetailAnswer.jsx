import { Card, Image, Modal } from "antd"
import { BulbFilled, BulbOutlined, FileImageFilled, FileImageOutlined, QuestionOutlined, UnorderedListOutlined } from '@ant-design/icons'

const DetailAnswer = ({ isModalOpen, handleOk, handleCancel, correctAnswer = "", userAnswer = "" }) => {

  const MediaRs = ({ source }) => {

    let type1 = ["jpeg", "jpg", "png"];
    // let type2 = ["mp4", "mp3"];
    let checkTypeImg = type1.some(t => source.includes(t));
    // let checkTypeAudio = type2.some(t => source.includes(t));

    return (
      <Card >
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-1">
          <FileImageFilled className="!text-blue-600" />
          {
            checkTypeImg ? "Hình ảnh câu hỏi" : "File âm thanh"
          }
        </h4>
        <div className={`w-full ${checkTypeImg ? "bg-gray-200 !h-[60vh]" : "bg-blue-200 !h-[15vh]"}  rounded-lg flex items-center justify-center  overflow-auto`}>
          {checkTypeImg === true ?
            <Image
              className="!w-full "
              src={source}
            />
            :
            <audio controls className="flex-1 mx-5">
              <source src="#" type="audio/mpeg" />
            </audio>
          }

        </div>
      </Card>
    )
  }

  const data = [
    { key: "A", text: "He is reading a book" },
    { key: "B", text: "He is writing a letter" },
    { key: "C", text: "He is using a computer" }, // đáp án đúng
    { key: "D", text: "He is talking on the phone" },
  ];

  const AnswerStyle = ({ num, text, correctAnswer, userAnswer }) => {
    let borderClass = "!border-2 !border-gray-300";
    let textClass = "";

    if (num === correctAnswer) {
      borderClass = "!border-2 !border-green-600 bg-green-50";
      textClass = "text-green-700 font-medium";
    } else if (num === userAnswer && userAnswer !== correctAnswer) {
      borderClass = "!border-2 !border-red-600 bg-red-50";
      textClass = "text-red-600 font-medium";
    }

    return (
      <Card size="small" className={borderClass}>
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
               ${num === correctAnswer
                ? "bg-green-500 text-[#ffffff]"
                : num === userAnswer
                  ? "bg-red-500 text-[#ffffff]"
                  : "bg-gray-100"}`}
          >
            {num}
          </div>
          <span className={textClass}>{text}</span>
        </div>
      </Card>
    );
  };

  return (
    <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={{
        xs: '90%',
        sm: '85%',
        md: '75%',
        lg: '65%',
        xl: '60%',
        xxl: '50%',
      }}
      style={{
        top: 20
      }}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <QuestionOutlined className="text-2xl !text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Chi tiết câu hỏi #<span id="enhancedQuestionNumber">1</span></h3>
              <p className="text-gray-600">Part 1 - Photographs</p>
            </div>
          </div>
        </div>

        <MediaRs source={"https://s4-media1.study4.com/media/e24/images_fixed2/image206.png"} />

        {/* answer */}

        <div className="mt-5">
          <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-1">
            <UnorderedListOutlined />
            Các lựa chọn trả lời
          </h4>
          <div className="flex flex-col !space-y-3">
            {data.map((ans, index) => {
              return (
                <AnswerStyle
                  key={ans.key}
                  num={ans.key}
                  text={ans.text}
                  correctAnswer={correctAnswer}
                  userAnswer={userAnswer}
                />
              )
            })}
          </div>
        </div>

        {/* explain */}

        <Card className="!mt-5 !bg-blue-50 border !border-blue-200">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-1">
            <BulbOutlined />
            Giải thích chi tiết
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Trong hình ảnh, chúng ta có thể thấy một người đàn ông đang ngồi trước bàn làm việc.
            Anh ta đang đặt tay lên bàn phím và nhìn vào màn hình máy tính. Đây rõ ràng là hành động
            "sử dụng máy tính" (using a computer), do đó đáp án C là chính xác nhất.
          </p>
        </Card>

      </div>
    </Modal>
  )
}
export default DetailAnswer