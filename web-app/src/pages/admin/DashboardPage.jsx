import { Typography } from 'antd';
import { Title } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NumberStatistic from '../../components/admin/dashboard/NumberStatistic';
import BaseStatistic from '../../components/admin/dashboard/BaseStatistic';
import CurrentAttemptsTable from '../../components/admin/dashboard/CurrentAttemptsTable';
import { retrieveAllAttempts } from '../../slice/attempts';
import { retrieveAccounts } from '../../slice/accounts';
import { retrieveAllTests } from '../../slice/tests';
import _ from 'lodash';

const DashboardPage = () => {
    const dispatch = useDispatch();

    const { allAttempts } = useSelector(state => state.attempts)
    const { tests } = useSelector(state => state.tests)
    const { accounts } = useSelector(state => state.accounts)
    const [attemptDataChart, setAttemptDataChart] = useState();
    const [attemptsByType, setAttemptsByType] = useState();
    const [topQuizzes, setTopQuizzes] = useState();
    const [ieltsAverageScoreChartData, setIeltsAverageScoreChartData] = useState();
    const [toeicAverageScoreChartData, setToeicAverageScoreChartData] = useState();
    const sampleAttempt = [100, 200, 300, 400, 500, 600, 700, 129, 384, 842, 292, 323]
    const ieltsAverageScoreData = {
        label: ["IELTS GT Mock 1", "IELTS AC Mock 2", "IELTS Speaking Test", "IELTS Writing Task 1", "IELTS Listening Set A"],
        sampleData: [6.8, 7.0, 7.5, 6.5, 7.2],
        type: "score-ielts"
    }
    const toeicAverageScoreData = {
        label: ["TOEIC ETS Test 5", "TOEIC Reading Set B", "TOEIC Listening Practice", "TOEIC Test 4", "TOEIC Full Test 2023"],
        sampleData: [850, 790, 880, 830, 910],
        type: "score-toeic"
    }
    const sampleToeicScore = [850, 790, 880, 830, 910]
    const getNumberAttemptsEachMonth = (attempts) => {
        const monthCounts = Array(12).fill(0);
        attempts.forEach(attempt => {
            const date = new Date(attempt?.submittedAt);
            const monthIndex = date.getMonth();

            monthCounts[monthIndex] += 1;

        })
        return monthCounts;
    }
    const getAverageScore = (attempts) => {
        if (!attempts || attempts.length === 0) return 0;

        const totalScore = attempts.reduce((sum, attempt) => {
            return sum + (attempt.score || 0);
        }, 0);

        return Math.round(totalScore / attempts.length);
    }
    const getTopFive = (data, field) => {
        let dataCounts;
        if (field) {
            dataCounts = _.countBy(data, field);
        }


        const top5Values = _(dataCounts)
            .toPairs()
            .orderBy([1], ['desc'])
            .slice(0, 5)
            .map(([value]) => isNaN(value) ? value : Number(value))
            .value();

        return field ? data?.filter(item => top5Values.includes(item[field])) : data;
    };
    const buildScoreChartData = (attempts, tests, type) => {
        if (!attempts || attempts.length === 0) {
            return { label: [], sampleData: [], type };
        }

        const groupedByQuiz = _.groupBy(attempts, "quizId");

        const labels = [];
        const sampleData = [];

        Object.keys(groupedByQuiz).forEach(quizId => {
            const quizAttempts = groupedByQuiz[quizId];

            const title = tests?.find(t => t.id === Number(quizId))?.title || `Test ${quizId}`;

            labels.push(title);

            const totalScore = quizAttempts.reduce((sum, a) => sum + (a.score || 0), 0);
            sampleData.push(Math.round(totalScore / quizAttempts.length));
        });

        return {
            label: labels,
            sampleData,
            type
        };
    };

    useEffect(() => {
        dispatch(retrieveAllAttempts());
        dispatch(retrieveAccounts());
        dispatch(retrieveAllTests());

    }, [])

    useEffect(() => {
        //use for attempt chart
        setAttemptDataChart(getNumberAttemptsEachMonth(allAttempts));
        if (allAttempts?.length > 0) {
            const attemptGroupByType = _.groupBy(allAttempts, "type");
            setAttemptsByType(attemptGroupByType);

            const toeicAttempts = attemptGroupByType["TOEIC"] || [];
            const ieltsAttempts = attemptGroupByType["IELTS"] || [];

            const topToeicTests = getTopFive(toeicAttempts, "quizId");
            const topIeltsTests = getTopFive(ieltsAttempts, "quizId")
            setToeicAverageScoreChartData(
                buildScoreChartData(topToeicTests, tests, "score-toeic")
            );

            setIeltsAverageScoreChartData(
                buildScoreChartData(topIeltsTests, tests, "score-ielts")
            );

        }

        const formattedTopQuizzes = getTopFive(tests, null)?.map(q => ({
            title: q.title,
            type: q.type,
            attempts: allAttempts.filter(a => a.quizId === q.id).length
        }));
        setTopQuizzes(formattedTopQuizzes)
    }, [allAttempts, tests])
    // console.log("all attempts", allAttempts);
    // console.log("all tests", tests);
    // console.log("all accounts", accounts);
    // console.log("Attempt chart data:", attemptDataChart)
    // console.log(toeicAverageScoreChartData?.sampleData);
    // console.log(ieltsAverageScoreChartData);
    // console.log("Attempt by type:", attemptsByType)
    // console.log("top qu", topQuizzes);
    return (
        <div>
            <Typography.Text strong className='!text-3xl'>
                Lingo Quiz Management Dashboard
            </Typography.Text>
            <NumberStatistic topQuizzes={topQuizzes} />
            <BaseStatistic sampleData={attemptDataChart} type={"attempt"} label={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} topQuizzes={topQuizzes} />
            <div className='grid grid-cols-2 gap-6'>

                <BaseStatistic
                    sampleData={ieltsAverageScoreChartData?.sampleData}
                    label={ieltsAverageScoreChartData?.label}
                    type={ieltsAverageScoreChartData?.type}
                />

                <BaseStatistic
                    sampleData={toeicAverageScoreChartData?.sampleData}
                    label={toeicAverageScoreChartData?.label}
                    type={toeicAverageScoreChartData?.type}
                />
            </div>
            <CurrentAttemptsTable />
        </div>
    );

}



export default DashboardPage;