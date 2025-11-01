import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import SideProgress from './SideProgress';
import QuestionCard from './QuestionCard';

const MainContent = React.memo(({ editMode, testTitle, testId }) => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [listQuestionNumber, setListQuestionNumber] = useState(0);
    const [isSideProgressOpen, setIsSideProgressOpen] = useState(false);
    const questionRefs = useRef({});
    const { questions } = useSelector((state) => state.questions);

    const groupQuestion = React.useMemo(() => _.groupBy(
        questions?.map((q, i) => ({
            ...q,
            resourceContent: q.resourceContent ?? `null-${i}`,
        })),
        'resourceContent'
    ), [questions]);



    const questionCardComponents = React.useMemo(() => Object.entries(groupQuestion).map(
        ([key, item]) => (
            <div key={key} className="mb-8">
                <QuestionCard
                    questions={item}
                    groupKey={key}
                    questionRefs={questionRefs}
                    resourceContent={item[0].resourceContent}
                    editMode={editMode}
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                />
            </div>
        )
    ), [groupQuestion, editMode, activeQuestion]);

    const movePage = useCallback((action) => {
        setListQuestionNumber((prev) => {
            let newIndex = prev;
            if (action === 'next') newIndex = Math.min(prev + 1, questionCardComponents.length - 1);
            if (action === 'previous') newIndex = Math.max(prev - 1, 0);
            const groupKey = Object.keys(groupQuestion)[newIndex];
            const groupQuestions = groupQuestion[groupKey];
            if (groupQuestions && groupQuestions.length > 0) {
                setActiveQuestion(groupQuestions[0].questionNumber);
                setTimeout(() => {
                    questionRefs.current[groupQuestions[0].questionNumber]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }, 100);
            }
            return newIndex;
        });
    }, [groupQuestion, questionCardComponents.length]);

    const questionToGroupIndex = React.useMemo(() => {
        const map = {};
        Object.entries(groupQuestion).forEach(([_, item], groupIdx) => {
            item.forEach((q) => { map[q.questionNumber] = groupIdx; });
        });
        return map;
    }, [groupQuestion]);


    return (
        <main className="flex min-h-screen flex-col lg:flex-row lg:relative">
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="bg-[#ffffff] rounded-xl p-4 sm:p-6 shadow-lg mb-8">
                    <div className="flex justify-between items-center mb-4 lg:hidden">
                        <Button
                            type="primary"
                            className="w-32 h-10"
                            onClick={() => setIsSideProgressOpen(!isSideProgressOpen)}
                        >
                            {isSideProgressOpen ? 'Hide Progress' : 'Show Progress'}
                        </Button>
                    </div>

                    {questionCardComponents[listQuestionNumber]}

                    <div className={`flex ${editMode ? 'mt-16' : 'mt-6'} justify-between`}>
                        <Button
                            type="primary"
                            className="rounded-lg bg-black w-32 h-12 hover:bg-gray-700 text-[#ffffff] mx-2 sm:mx-4"
                            onClick={() => movePage('previous')}
                            disabled={listQuestionNumber === 0}
                        >
                            Previous Part
                        </Button>
                        <Button
                            type="primary"
                            className="rounded-lg w-32 h-12 mx-2 sm:mx-4"
                            onClick={() => movePage('next')}
                            disabled={listQuestionNumber === questionCardComponents.length - 1}
                        >
                            Next Part
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`lg:block ${isSideProgressOpen ? 'block' : 'hidden'} lg:relative absolute lg:top-0 top-[450px] w-full lg:w-80 bg-[#ffffff] border-l border-gray-200 p-4 sm:p-6 mt-4 lg:mt-6 rounded-xl lg:mr-7`}>
                <SideProgress
                    parts={_.uniq(questions?.map((item) => item.part))}
                    questionsPerPart={_.countBy(questions, 'part')}
                    currentIndex={listQuestionNumber}
                    setCurrentIndex={setListQuestionNumber}
                    questionToGroupIndex={questionToGroupIndex}
                    questionRefs={questionRefs}
                    activeQuestion={activeQuestion}
                    setActiveQuestion={setActiveQuestion}
                    isSideProgressOpen={isSideProgressOpen}
                />
            </div>
        </main>
    );
});

export default MainContent;
