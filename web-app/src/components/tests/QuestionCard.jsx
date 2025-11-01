import React, { useEffect, useState } from "react";
import { Button, Card, Descriptions, Form, Image, Input, Radio, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaFileExcel, FaUpload } from "react-icons/fa";

import { checkType } from "../../utils/checkType";
import { getUserAnswers, modifyQuestion } from "../../slice/questions";
import { modifyAnswer } from "../../slice/answers";
import { uploadOneFile } from "../../service/FileService";
import { saveSingleFile, saveUpdatingExplanationResourceContent, saveUpdatingResourceMedia } from "../../slice/files";
import { modifyResourceContent } from "../../slice/resource";

const QuestionCard = ({ groupKey, questionRefs, resourceContent, editMode, questions, activeQuestion, setActiveQuestion }) => {
    const [form] = useForm();
    const [answers, setAnswers] = useState({});
    const [explanation, setExplanation] = useState();
    const dispatch = useDispatch();
    const { fileUpdating } = useSelector(state => state.file)
    const { userAnswers } = useSelector((state) => state.questions);

    // Quill toolbar config
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ color: [] }, { background: [""] }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };


    // handle selecting an answer
    const handleAnswerChange = (qId, userAnswerChoice, isCorrect, questionTitle, userAnswer, questionNumber) => {
        setAnswers((prev) => ({ ...prev, [qId]: { userAnswerChoice, isCorrect } }));

        dispatch(
            getUserAnswers({
                questionId: qId,
                questionTitle,
                userAnswerChoice,
                userAnswer,
                isCorrect,
                questionNumber,
            })
        );
    };

    // handle saving all updates
    const handleSaveAll = (values) => {
        const isUrl = checkType(resourceContent) === "url";

        questions.forEach((question, questionIndex) => {
            const updatingQuestion = {
                title: values.questions[questionIndex].title,
                point: question.point,
                answerKey: values.questions[questionIndex].correct,
                explanation: values.questions[questionIndex].explanation,
                part: question.part,
                questionNumber: question.questionNumber,
                category: question.category,
                resourceContent: isUrl ? question.resourceContent : values.passage,
                explanationResourceContent: question.explanationResourceContent,
            };

            dispatch(modifyQuestion({ id: question.id, question: updatingQuestion }));
            dispatch(modifyResourceContent({
                id: question.resourceContentId,
                resource: {
                    resourceContent: values?.passage,
                    explanationResourceContent: question.explanationResourceContent,
                    description: "updated"
                }
            }))
            question.answers.forEach((answer, answerIndex) => {
                const updatingAnswer = {
                    content: values.questions[questionIndex].answers[answerIndex].content,
                    correct: String.fromCharCode(65 + answerIndex) === values.questions[questionIndex].correct,
                };
                dispatch(modifyAnswer({ id: answer.id, answer: updatingAnswer }));
            });
        });

        console.log("Load data:", values);
    };

    const handleUpdateContentImage = (options) => {
        const { file, onSuccess, onError } = options;
        console.log("debug get data:", Number(questions[0].resourceContentId))
        dispatch(saveUpdatingResourceMedia({
            resourceId: Number(questions[0].resourceContentId),
            testTitle: questions[0].testTitle,
            fileCategory: "QUESTION_IMAGE",
            currentResourceContent: questions[0]?.resourceContent,
            file: file,
            updatedFileName: questions[0].resourceContent.split("/").pop()
        }))
    }
    const handleUpdateExplanationResource = (options, updatingQuestion) => {
        const { file, onSuccess, onError } = options;
        dispatch(saveUpdatingExplanationResourceContent(updatingQuestion))
    }
    // console.log("question of page:", questions)


    useEffect(() => {
        if (checkType(resourceContent) === "url") {
            const img = new window.Image();
            img.src = resourceContent;
        }
    }, [questions]);
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveAll}
            initialValues={{
                explanation: explanation,
                passage: resourceContent,
                questions: questions.map((q) => ({
                    title: q.title,
                    answers: q.answers?.map((a) => ({ content: a.content })),
                })),
            }}
        >
            <div className="flex gap-8 xl:flex-row flex-col">
                {/* Passage section */}
                {editMode ? (
                    <div className="flex flex-col flex-1">
                        {checkType(resourceContent) === "url" ? (
                            <>
                                <p>Nội dung câu hỏi (hình ảnh)</p>
                                <Upload.Dragger
                                    customRequest={handleUpdateContentImage}
                                    fileList={null}
                                    multiple={false}
                                    className="!h-64 w-full !flex !flex-col !justify-center !items-center "
                                >
                                    <p className="ant-upload-drag-icon w-24 h-24 flex items-center justify-center p-4">
                                        <FaUpload className="text-black text-6xl" />
                                    </p>
                                    <p className="text-xl font-medium">Kéo thả file vào đây</p>
                                    <span>
                                        hoặc <span className="text-blue-400">chọn file</span>
                                    </span>
                                </Upload.Dragger>
                            </>



                        ) : (
                            <div className={checkType(resourceContent) === "null" ? "hidden" : ""}>
                                <Form.Item name="passage" label="Nội dung câu hỏi (đoạn văn)">
                                    <ReactQuill
                                        theme="snow"
                                        className="bg-blue-50 rounded-md"
                                        modules={quillModules}
                                    />
                                </Form.Item>
                            </div>
                        )}
                    </div>

                ) : (
                    <div
                        className={
                            checkType(resourceContent) === "null"
                                ? "hidden"
                                : "bg-blue-50 rounded-lg p-6 mb-8 ml-4 flex-1 flex flex-col"
                        }
                    >
                        <div className="flex items-center mb-4">
                            <span className="text-sm text-blue-600 font-medium">
                                Questions {questions[0]?.questionNumber}
                                {questions.length > 1 &&
                                    ` - ${questions[questions.length - 1]?.questionNumber}`}
                            </span>
                        </div>

                        {checkType(resourceContent) === "url" ? (
                            <Image src={resourceContent} onLoad={() => console.log("Load image of question:")} />
                        ) : (
                            <div
                                className="prose max-w-none text-lg"
                                dangerouslySetInnerHTML={{ __html: resourceContent }}
                            />
                        )}
                    </div>
                )}

                {/* Questions section */}
                <div className="flex-1">
                    {questions.map((q, qId) => (
                        <>
                            <Card
                                key={q.id}
                                ref={(el) => (questionRefs.current[q.questionNumber] = el)}
                                className="!border-2 border-gray-200 rounded-lg !mb-2 h-auto"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            onClick={() => setActiveQuestion(q.questionNumber)}
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold cursor-pointer
                                            ${activeQuestion === q.questionNumber
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {q.questionNumber}
                                        </div>

                                    </div>

                                    <div className="flex-1">
                                        {editMode ? (
                                            <Form.Item
                                                name={["questions", qId, "title"]}
                                                label={`Question ${q.questionNumber}`}
                                            >
                                                <Input.TextArea rows={2} />
                                            </Form.Item>
                                        ) : (
                                            <h4 className="text-lg font-semibold mb-3">
                                                {q.title || `Question ${q.iId}`}
                                            </h4>
                                        )}

                                        {editMode ? (
                                            <>
                                                {q.answers?.map((ans, aId) => (
                                                    <>
                                                        <Form.Item
                                                            key={ans.id}
                                                            name={["questions", qId, "answers", aId, "content"]}
                                                            label={`Answer ${aId + 1}`}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </>
                                                ))}

                                                <Form.Item
                                                    name={["questions", qId, "correct"]}
                                                    label="Correct Answer"
                                                    initialValue={
                                                        q.answers?.find((ans) => ans.correct === "true")
                                                            ? String.fromCharCode(65 + q.answers.findIndex((ans) => ans.correct === "true"))
                                                            : null
                                                    }
                                                >
                                                    <Radio.Group>
                                                        {q.answers?.map((ans, aId) => (
                                                            <Radio key={ans.id} value={String.fromCharCode(65 + aId)}>
                                                                Answer {aId + 1}
                                                            </Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>

                                            </>
                                        )
                                            : (
                                                <Radio.Group
                                                    onChange={(e) =>
                                                        handleAnswerChange(
                                                            q.id,
                                                            e.target.value,
                                                            q.answers.find((a) => a.id === e.target.value)?.correct,
                                                            q.title,
                                                            q.answers.find((a) => a.id === e.target.value)?.content,
                                                            q.questionNumber
                                                        )
                                                    }
                                                    value={userAnswers.find(a => a.questionId === q.id)?.userAnswer || ""}
                                                    className="!space-y-3 !flex !flex-col"
                                                >
                                                    {q.answers?.map(
                                                        (ans, index) =>
                                                            ans.content && (
                                                                <Radio key={ans.id} value={index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D"} className="!text-base">
                                                                    {ans.content}
                                                                </Radio>
                                                            )
                                                    )}
                                                </Radio.Group>
                                            )}
                                    </div>
                                </div>
                                {editMode && (
                                    <>
                                        <Form.Item
                                            name={["questions", qId, "explanation"]}
                                            label="Giải thích"
                                            initialValue={q.explanation}
                                            valuePropName="value"
                                            getValueFromEvent={(value) => value}
                                        >
                                            <ReactQuill
                                                theme="snow"
                                                className="bg-blue-50 rounded-md"
                                                modules={quillModules}
                                            />
                                        </Form.Item>

                                        <p>Thêm file cho phần giải thích (tùy chọn) </p>
                                        <Upload.Dragger
                                            customRequest={(options) => handleUpdateExplanationResource(options, {
                                                questionId: q.id,
                                                testTitle: q.testTitle,
                                                fileCategory: "QUESTION_AUDIO",
                                                currentResourceContent: q.explanationResourceContent,
                                                file: options.file,
                                                updatedFileName: q.explanationResourceContent.split("/").pop()

                                            })}
                                            fileList={null}
                                            multiple={false}
                                            className="!h-64 w-full !flex !flex-col !justify-center !items-center !my-4"
                                        >
                                            <p className="ant-upload-drag-icon w-24 h-24 flex items-center justify-center p-4">
                                                <FaUpload className="text-black text-6xl" />
                                            </p>
                                            <p className="text-xl font-medium">Kéo thả file vào đây</p>
                                            <span>
                                                hoặc <span className="text-blue-400">chọn file</span>
                                            </span>
                                        </Upload.Dragger>
                                    </>
                                )}

                            </Card>

                        </>


                    ))}
                </div>
            </div>

            {editMode && (
                <>

                    <Form.Item className="mt-4">
                        <Button type="primary" htmlType="submit">
                            Save All
                        </Button>
                    </Form.Item>
                </>

            )}
        </Form>
    );
};

export default QuestionCard;