import React, { useEffect, useState } from 'react';
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
import { FaRegImage } from 'react-icons/fa6';
import _ from "lodash";

const CreateTestPage = () => {
    const initialTestState = {
        id: null,
        title: "",
        type: "",
        timeLimit: null,
        numberQuestion: 0,
        maxScore: 0,
        description: "",
        mediaUrl: ""
    };
    const [test, setTest] = useState(initialTestState);
    const [questionSample, setQuestionSample] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [typeUpload, setTypeUpload] = useState();
    const [groupedUploadedFiles, setGroupedUploadedFiles] = useState();
    const { questionList, answerList, uploadPercent, uploadedFiles, loading } = useSelector((state) => state.file);
    const questionGroupedByPart = _.groupBy(questionSample, "part")

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const testTitle = useWatch("title", form);
    const mediaUrl = useWatch("mediaUrl", form);
    const onFinish = (values) => {
        const payload = {
            ...values,
            timeLimit: values.timeLimit * 60,
            numberQuestion: questionList.length // convert to seconds
        };
        console.log("BasicInfoValues:", values);
        dispatch(createTest(values))
            .unwrap()
            .then(data => {
                setTest(data);
                setSubmitted(true);

                dispatch(saveMultipleQuestions(questionSample));
                console.log("debug when upload:", questionSample)
            });

    };
    // console.log(form.getFieldValue("mediaUrl"));
    const newTest = () => {
        setTest(initialTestState);
        setSubmitted(false);
    }
    useEffect(() => {
        setQuestionSample(questionList);
    }, [questionList])
    useEffect(() => {
        const grouped = _.groupBy(uploadedFiles.flat(), "fileCategory")
        setGroupedUploadedFiles(grouped);
        if (grouped["LISTENING_AUDIO"]) {
            console.log("debug test audio:", grouped["LISTENING_AUDIO"])
            form.setFieldsValue({
                mediaUrl: grouped["LISTENING_AUDIO"]?.[0]?.mediaUrl
            });

        }
        if (typeUpload === "Part" && grouped["QUESTION_AUDIO"]) {
            const audioFiles = grouped["QUESTION_AUDIO"];

            setQuestionSample(prevQuestions =>
                prevQuestions.map(q => {
                    const matchedAudio = audioFiles.find(item => {
                        const part = item.mediaUrl
                            .split("/")
                            .pop()
                            .match(/PART[_ ]?(\d+)/i)?.[1];  // extract number like 1, 2, 3
                        return parseInt(part, 10) === parseInt(q.part.replace(/\D/g, ""), 10);
                    });

                    return matchedAudio
                        ? { ...q, explanationResourceContent: matchedAudio.mediaUrl }
                        : q;
                })
            );
        }




        if (grouped["QUESTION_AUDIO"] && typeUpload === "Question") {
            setQuestionSample(prevQuestions =>
                prevQuestions.map(q => {
                    const matchedFile = grouped["QUESTION_AUDIO"].find(item => {
                        const questionNumber = item?.fileName?.split("/")[1].split("-")[3];
                        // console.log("debug matched question number", questionNumber);
                        // console.log("debug matched question", parseInt(questionNumber.split("_")[1]?.split(".")[0], 10));
                        return (
                            questionNumber &&
                            parseInt(questionNumber?.split("_")[1]?.split(".")[0], 10) === q?.questionNumber
                        );
                    });

                    // console.log("debug matched file audio", matchedFile);

                    return matchedFile
                        ? { ...q, explanationResourceContent: matchedFile.mediaUrl }
                        : q;
                })
            );
        }
        if (grouped["QUESTION_IMAGE"]) {
            setQuestionSample(prevQuestions =>
                prevQuestions.map(q => {
                    const matchedFile = grouped["QUESTION_IMAGE"].find(item => {
                        const questionNumber = item?.fileName?.split("/")[1].split("-")[3];
                        if (!questionNumber) return false;

                        const parts = questionNumber.split(".")[0].split("_");
                        const questionNumberStart = parts[1];
                        const questionNumberEnd = parts[2];

                        // Multiple question case
                        if (questionNumberStart && questionNumberEnd) {
                            return (
                                q.questionNumber >= parseInt(questionNumberStart, 10) &&
                                q.questionNumber <= parseInt(questionNumberEnd, 10)
                            );
                        }

                        // Single question case
                        const num = parseInt(parts[1], 10);
                        return num === q?.questionNumber;
                    });

                    // If no file matched
                    if (!matchedFile) return q;

                    // Apply resourceContent update
                    return {
                        ...q,
                        resourceContent: matchedFile.mediaUrl,
                    };
                })
            );
        }

    }, [uploadedFiles, form])
    // console.log("Grouped files:", groupedUploadedFiles)
    // console.log("Question by part:", questionGroupedByPart);
    // console.log("Audio file for test:", form.getFieldValue("mediaUrl"));
    console.log("Questions:", questionList);
    console.log("Questions upload sample", questionSample)
    // console.log("Test title before upload:", form.getFieldValue("title"));
    return (
        <>
            <Card className="p-6 shadow rounded-2xl">
                <h2 className="text-2xl font-bold mb-1">Tạo bài thi mới</h2>
                <p className="text-gray-500 mb-6">
                    Tạo và quản lý các bài thi IELTS, TOEIC một cách dễ dàng
                </p>

                <Form layout="vertical" form={form} onFinish={onFinish} encType={test.type === "Excel" ? "multipart/form-data" : ""}>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Tên bài thi" className="col-span-1" name="title">
                            <Input placeholder="Nhập tên bài thi..." className='!h-12' />
                        </Form.Item>
                        <Form.Item label="Loại bài thi" className="col-span-1" name="type">
                            <Select placeholder="Chọn loại bài thi" className='!h-12'>
                                <Option value="IELTS">IELTS</Option>
                                <Option value="TOEIC">TOEIC</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="md:grid md:grid-cols-2 flex flex-wrap gap-6 my-6">
                        <div>
                            <p className="draggerTittle"><FaFileExcel className='text-green-600 text-lg' />File câu hỏi (Excel)</p>
                            <UploadDragger type={"Excel"}
                                testTitle={testTitle}
                                mediaUrl={mediaUrl} />
                        </div>
                        <Form.Item name="mediaUrl" hidden>
                            <Input />
                        </Form.Item>
                        <div>
                            <p className="draggerTittle">  <HiSpeakerWave className='text-blue-600 text-xl' />File âm thanh</p>
                            <UploadDragger type={"LISTENING_AUDIO"} form={form} />
                        </div>
                        <div>
                            <div className='flex items-center lg:justify-between xl:flex-row flex-col'>
                                <p className="draggerTittle">  <HiSpeakerWave className='text-blue-600 text-xl' />File âm thanh theo từng phần hoặc câu hỏi</p>
                                <div className='flex gap-2 items-center mb-2'>
                                    <Button className="!bg-blue-400 hover:!bg-blue-600 hover:!text-black active:!bg-blue-600"
                                        onClick={() => setTypeUpload("Part")}>Từng phần</Button>
                                    <Button className="!bg-green-400 hover:!bg-green-600 hover:!text-black active:!bg-green-600"
                                        onClick={() => setTypeUpload("Question")}>Câu hỏi</Button>
                                </div>
                            </div>

                            <UploadDragger type={"QUESTION_AUDIO"} form={form} typeUpload={typeUpload} />
                        </div>
                        <div>
                            <p className="draggerTittle">  <FaRegImage className='text-orange-900 text-xl' />File hình ảnh câu hỏi</p>
                            <UploadDragger type={"QUESTION_IMAGE"} form={form} />
                        </div>
                    </div>
                    {/* Exam Settings */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item label="Thời gian làm bài (phút)" name="timeLimit" initialValue={60}>
                            <Input className='!h-12' />
                        </Form.Item>
                        <Form.Item label="Số câu hỏi" name="numberQuestion" initialValue={40}>
                            <Input className='!h-12' />
                        </Form.Item>
                        <Form.Item label="Điểm tối đa" name="maxScore" initialValue={100}>
                            <Input className='!h-12' />
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
                    <Progress
                        percent={uploadPercent}
                        format={() => "Upload file câu hỏi"}
                        status={loading ? "active" : uploadPercent === 100 ? "success" : "normal"}
                    />

                    <Progress percent={33} format={() => "Hoàn thành và xuất bản"} />
                </div>
            </Card >
        </>
    );
};

export default CreateTestPage;