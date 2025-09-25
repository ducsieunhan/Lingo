import { Button, Card, Col, Modal, Row, Tabs } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import DetailAnswer from "./DetailAnswer";
import { PartLengthToeic, TestType } from "../../data/FixedData";
import { attempt } from "../../data/MockData";

const SectionAnswer = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Choice, setChoice] = useState("");
  const [Correct, setCorrect] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Questions = ({ questionNumber, choice = "N", correct = "N" }) => {

    let check = choice === correct;

    // return (
    //   <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} lg={{ flex: '25%' }}
    //   >
    //     <div className={`flex items-center justify-center  space-x-2  border ${check ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"} rounded-lg px-3 py-2`}>
    //       <span className={`w-6 h-6 md:w-4 md:h-4 ${check ? "bg-emerald-500" : "bg-rose-500"} text-[#ffffff] rounded-full flex items-center justify-center text-[8px] font-bold`}>{questionNumber}</span>
    //       <span className="text-sm text-gray-700">{choice + "->" + correct}</span>
    //       {check ?
    //         <CheckOutlined className="!font-bold !text-emerald-400" />
    //         :
    //         <CloseOutlined className="!font-bold !text-rose-400" />
    //       }
    //       <Button icon={<EyeFilled />} size="small" type="primary" onClick={() => {
    //         showModal();
    //         setChoice(choice);
    //         setCorrect(correct);;
    //       }}>
    //         Xem
    //       </Button>
    //     </div>
    //   </Col>
    // )

    return (
      <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} lg={{ flex: '25%' }}
      >
        <div className={`flex flex-nowrap items-center justify-center  space-x-2   rounded-lg px-3 py-2`}>
          <span className={` text-black rounded-full flex items-center justify-center text-sm font-bold`}>{questionNumber}.</span>
          <span className="text-sm text-gray-700 whitespace-nowrap">{choice + " -> " + correct}</span>
          {check ?
            <CheckOutlined className="!font-bold !text-emerald-400" />
            :
            <CloseOutlined className="!font-bold !text-rose-400" />
          }
          <Button size="small" type="text" className="!px-0 !text-blue-700" onClick={() => {
            showModal();
            setChoice(choice);
            setCorrect(correct);
          }}>
            [Chi tiết]
          </Button>
        </div>
      </Col>
    )
  }

  const items = PartLengthToeic.map((part) => {
    return {
      key: String(part.part),
      label: `Part ${part.part}`,
      children: (
        <Row gutter={[16, 16]}>
          {Array.from({ length: part.length }).map((_, index) => (
            <Questions key={index} questionNumber={index + part.start}
              choice={attempt.answers[index].user_answer}
              correct={attempt.answers[index].correct_answer}
            />
          ))}
        </Row>
      )
    };
  });


  return (
    <Card className="!shadow-lg !pb-3 !mt-7" id="my-section">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        <UnorderedListOutlined className="mr-2" />
        Chi tiết từng phần
      </h3>

      <Tabs
        defaultActiveKey="1"
        type="card"
        tabBarGutter={12} // khoảng cách giữa các tab
        tabBarStyle={{
          marginBottom: 24,
        }}
        items={items}
      />

      <DetailAnswer isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        correctAnswer={Correct}
        userAnswer={Choice}
      />

    </Card>
  )
}
export default SectionAnswer