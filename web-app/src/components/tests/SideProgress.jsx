import React from "react";
import { useSelector } from "react-redux";

const SideProgress = ({ parts, questionsPerPart, currentIndex, setCurrentIndex, questionToGroupIndex, questionRefs, activeQuestion, setActiveQuestion, isSideProgressOpen }) => {
    const { userAnswers } = useSelector((state) => state.questions);
    const handleClick = (qNum) => {
        const targetGroup = questionToGroupIndex[qNum];
        if (targetGroup !== undefined) {
            setCurrentIndex(targetGroup);
            setActiveQuestion(qNum);
            setTimeout(() => {
                questionRefs.current[qNum]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 100);
        }
    };

    return (
        <div className="lg:w-80 w-[100vw] bg-white border-l border-gray-200 p-6 overflow-y-auto mt-6 rounded-xl mr-7">
            {parts.map((part, index) => {
                const numQuestionPreviousPart = parts
                    .slice(0, index)
                    .reduce((acc, p) => acc + questionsPerPart[p], 0);

                return (
                    <div key={part} className="mb-6">
                        <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                                {part?.split(" ")[1]}
                            </span>
                            {part}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {Array.from({ length: questionsPerPart[part] }, (_, i) => {
                                const qNum = numQuestionPreviousPart + i;

                                return (
                                    <div
                                        key={`${part}-${qNum}`}
                                        onClick={() => handleClick(qNum + 1)}

                                        className={`question-indicator w-10 h-10 rounded border flex items-center justify-center text-sm font-medium cursor-pointer transition-colors
                                            ${userAnswers?.find((a) =>
                                            a?.questionNumber === qNum + 1 && a?.userAnswer !== ""
                                        )
                                                ? "!border-blue-500 !bg-blue-50 !text-blue-600"
                                                : "border-gray-300 bg-white hover:bg-gray-50"}
                                           ${activeQuestion === qNum + 1 ? "!bg-blue-500 !text-white" : ""}

                                        `}
                                    >
                                        {qNum + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SideProgress;