import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Progress, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IoIosExit } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { submitUserAnswer } from "../../slice/tests";
import _ from "lodash";
import { createAttempts } from "../../slice/attempts";
import { useLocation, useNavigate } from "react-router-dom";

const TimeFrame = ({ editMode, setEditMode }) => {
    const dispatch = useDispatch();
    const { userAnswers, questions } = useSelector((state) => state.questions);
    const { user } = useSelector((state) => state.authentication);
    const { loading } = useSelector((state) => state.attempts);
    const { test } = useSelector(state => state.test);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timeLimitFormat, setTimeLimitFormat] = useState();
    const [progress, setProgress] = useState(0);
    const [modalSubmit, setModalSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
    const roles = userInfo.roles || [];

    useEffect(() => {
        if (test?.timeLimit) {
            setTimeRemaining(test.timeLimit * 60);
        }
    }, [test]);
    useEffect(() => {
        setProgress(100 * userAnswers?.filter(a => a.userAnswer !== "").length / userAnswers.length)
    }, [userAnswers])
    useEffect(() => {
        const countDownInterval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(countDownInterval);
                    alert("Time out!");
                    handleSubmitUserAnswers();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countDownInterval);
    }, []);

    useEffect(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setTimeLimitFormat(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    }, [timeRemaining]);

    const handleSubmitUserAnswers = async () => {
        const timeTaken = test.timeLimit * 60 - timeRemaining;

        try {
            const attemptId = await dispatch(
                createAttempts({
                    quizId: test?.id || null,
                    userId: user?.sub || null,
                    timeTaken,
                    type: test?.type || null,
                    field: ["Listening", "Reading"],
                    answers: _.map(userAnswers, (a) => _.omit(a, "questionNumber")),
                })
            ).unwrap();

            const currentPath = location.pathname;
            const basePath = currentPath.replace(/\/doTests$/, "");

            navigate(`${basePath}/results/${attemptId}`);
        } catch (err) {
            console.error("Nộp bài thất bại:", err);
        }
    };

    const showModalSubmit = () => {
        setModalSubmit(true);
    };
    const handleOk = () => {
        handleSubmitUserAnswers();
        setModalSubmit(false);
    };
    const handleCancel = () => {
        setModalSubmit(false);
    };

    if (loading) return <Spin spinning={loading} fullscreen={true} />
    return (
        <div className="w-full h-full px-14 py-4 bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">

            <div className="lg:flex lg:justify-between lg:items-center grid grid-cols-2">
                <div className="flex gap-3 items-center col-span-2 sm:col-span-1">
                    <p className="bg-[#ffffff] rounded-lg w-8 h-8 flex justify-center items-center text-lg">📚</p>
                    <p className="text-[#ffffff] font-semibold text-lg">English Proficiency Test</p>
                </div>

                {(roles.includes("manage-users") || roles.length === 0) && (
                    <Button
                        className={`!text-xl !border-0 !text-[#ffffff] !p-5 flex justify-center items-center sm:col-auto col-span-1 !w-3xs sm:w-3/5 lg:!ml-0 sm:!ml-36
      ${editMode ? "!bg-red-500 hover:!bg-red-600" : "!bg-amber-500 hover:!bg-amber-600"}`}
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? (
                            <span className="flex items-center gap-2">
                                <IoIosExit className="text-2xl" /> Exit Edit
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <FaEdit /> Edit Mode
                            </span>
                        )}
                    </Button>
                )}


                <div className="flex gap-4 col-span-2 justify-center lg:justify-baseline sm:mt-0 mt-6">
                    <p className="text-[#ffffff] text-base ">Time: <span className="font-bold">{timeLimitFormat}</span></p>
                    <Button className="!bg-red-600 !h-8 !w-24 !text-[#ffffff] !border-none !px-4 !text-sm hover:!bg-red-700">
                        Exit Test
                    </Button>
                    <Button htmlType="submit" onClick={showModalSubmit} className="hover:!bg-black !border-0 w-28">
                        Nộp bài
                    </Button>
                </div>
            </div>
            {
                test?.mediaUrl && (
                    <div className="mt-4">
                        <audio controls className="w-full">
                            <source src={test.mediaUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )
            }
            {/* Progress bar */}
            <div className="mt-3">
                <div className="flex justify-between items-center">
                    <p className="text-gray-200 text-[14px] mb-1 font-semibold">Overall Progress</p>
                    <p className="text-[#ffffff] text-[14px] font-semibold">{progress}% Complete</p>
                </div>

                <Progress
                    percent={progress}
                    showInfo={false}
                    strokeColor="#ffffff33"
                    trailColor="#ffffff22"
                />
            </div>
            <Modal
                title="Bạn có chắc chắn muốn nộp bài?"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modalSubmit}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Nộp bài"
                cancelText="Hủy"
            >
                <p>Sau khi nộp, bạn sẽ không thể thay đổi câu trả lời.</p>
            </Modal>
        </div >
    );
};

export default TimeFrame;