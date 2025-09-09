import React, { useState } from 'react';
import { Button, Card, Form, Input, Progress, Select, Upload } from 'antd';
import {

    UploadOutlined,
    EyeOutlined,
    SaveOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import TextArea from 'antd/es/input/TextArea';
import { FaFileExcel } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import UploadDragger from '../../components/admin/UploadDragger';
import { useDispatch, useSelector } from "react-redux";
import { createTest } from '../../slice/tests';
import { saveMultipleQuestions } from '../../slice/questions';
import { useWatch } from 'antd/es/form/Form';

const CreateTestPage = () => {
    const initialTestState = {
        id: null,
        title: "",
        type: "",
        timeLimit: null,
        numberQuestion: 0,
        maxScore: 0,
        description: ""
    };
    const [test, setTest] = useState(initialTestState);
    const [submitted, setSubmitted] = useState(false);
    const { questionList, answerList } = useSelector((state) => state.file);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const testTitle = useWatch("title", form);
    const mediaUrl = useWatch("mediaUrl", form);
    const onFinish = (values) => {
        console.log("BasicInfoValues:", values);

        dispatch(createTest(values))
            .unwrap()
            .then(data => {
                setTest(data);
                setSubmitted(true);

                dispatch(saveMultipleQuestions(questionList));
            });

    };
    const newTest = () => {
        setTest(initialTestState);
        setSubmitted(false);
    }
    console.log("Questions:", questionList);
    // console.log("Test title before upload:", form.getFieldValue("title"));
    return (
        <>
            <Card className="p-6 shadow rounded-2xl">
                <h2 className="text-2xl font-bold mb-1">Tạo bài thi mới</h2>
                <p className="text-gray-500 mb-6">
                    Tạo và quản lý các bài thi IELTS, TOEIC một cách dễ dàng
                </p>

                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Tên bài thi" className="col-span-1" name="title">
                            <Input placeholder="Nhập tên bài thi..." className='!h-12' onChange={() => { console.log("Test title before upload:", form.getFieldValue("title")); }} />
                        </Form.Item>
                        <Form.Item label="Loại bài thi" className="col-span-1" name="type">
                            <Select placeholder="Chọn loại bài thi" className='!h-12'>
                                <Option value="IELTS">IELTS</Option>
                                <Option value="TOEIC">TOEIC</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-6 my-6">
                        <div>
                            <p className="draggerTittle"><FaFileExcel className='text-green-600 text-lg' />File câu hỏi (Excel)</p>
                            <UploadDragger type={"Excel"}
                                testTitle={testTitle}
                                mediaUrl={mediaUrl} />
                        </div>

                        <div>
                            <p className="draggerTittle">  <HiSpeakerWave className='text-blue-600 text-xl' />File âm thanh (Tùy chọn)</p>
                            <UploadDragger type={"Audio"} />
                        </div>

                    </div>

                    {/* Exam Settings */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item label="Thời gian làm bài (phút)" name="timeLimit">
                            <Input defaultValue={60} className='!h-12' />
                        </Form.Item>
                        <Form.Item label="Số câu hỏi" name="numberQuestion">
                            <Input defaultValue={40} className='!h-12' />
                        </Form.Item>
                        <Form.Item label="Điểm tối đa" name="maxScore">
                            <Input defaultValue={100} className='!h-12' />
                        </Form.Item>
                    </div>

                    <Form.Item label="Mô tả bài thi" name="description">
                        <TextArea rows={4} placeholder="Nhập mô tả chi tiết về bài thi..." />
                    </Form.Item>

                    {/* Actions */}
                    <div className="flex justify-between gap-4 mt-6">
                        <Button icon={<EyeOutlined />} className='createBtn !bg-gray-600 hover:!bg-gray-800'>Xem trước</Button>
                        <Button type="primary" ghost icon={<SaveOutlined />} className='createBtn !bg-blue-600 hover:!bg-blue-700'>
                            Lưu nháp
                        </Button>

                        <Button type="primary" icon={<CheckCircleOutlined />} className='createBtn !bg-green-600 hover:!bg-green-800' htmlType='submit'>
                            Tạo bài thi
                        </Button>


                    </div>
                </Form>
            </Card >

            {/* Progress Section */}
            <Card Card className="mt-6 p-4" >
                <h3 className="text-lg font-semibold mb-3">Tiến độ tạo bài thi</h3>
                <div className="flex flex-col gap-2">
                    <Progress percent={100} format={() => "Thông tin cơ bản"} />
                    <Progress percent={66} format={() => "Upload file câu hỏi"} />
                    <Progress percent={33} format={() => "Hoàn thành và xuất bản"} />
                </div>
            </Card >
        </>
    );
};

export default CreateTestPage;