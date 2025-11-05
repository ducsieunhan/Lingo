import React, { useEffect, useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { MdCreditScore } from "react-icons/md";
import StatisticCard from './StatisticCard';
import { useSelector } from 'react-redux';

const NumberStatistic = ({ topQuizzes }) => {
    const { allAttempts } = useSelector(state => state.attempts)
    const { tests } = useSelector(state => state.tests)
    const { accounts } = useSelector(state => state.accounts)
    const [statistic, setStatistic] = useState([]);
    const groupAttemptsByType = (attempts) => {
        const result = {
            TOEIC: {},
            IELTS: {}
        };

        attempts.forEach(att => {
            const { type, score, title } = att;
            if (!result[type][title]) {
                result[type][title] = { totalScore: 0, count: 0 };
            }
            result[type][title].totalScore += score;
            result[type][title].count += 1;
        });

        return {
            TOEIC: Object.entries(result.TOEIC).map(([title, data]) => ({
                title,
                averageScore: +(data.totalScore / data.count).toFixed(2)
            })),

            IELTS: Object.entries(result.IELTS).map(([title, data]) => ({
                title,
                averageScore: +(data.totalScore / data.count).toFixed(2)
            }))
        };
    };
    const getMonthlyTrend = (items, dateField) => {
        if (!items?.length) return { value: 0, status: "same" };

        const now = new Date();
        const currentMonth = now.getMonth();
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const currentYear = now.getFullYear();
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        let currentTotal = 0;
        let previousTotal = 0;

        items.forEach(item => {
            const date = new Date(item[dateField]);
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear)
                currentTotal++;
            if (date.getMonth() === prevMonth && date.getFullYear() === prevYear)
                previousTotal++;
        });

        if (currentTotal === 0)
            return { value: 0, status: "same" };
        let ratio;
        if (currentTotal && previousTotal) {
            ratio = +(currentTotal / previousTotal).toFixed(2);
        }


        let status = "same";
        if (ratio < 1) status = "down";
        else if (ratio > 1) status = "up";

        return { value: ratio, status };
    };


    const userTrend = getMonthlyTrend(accounts, "createdAt");
    const quizTrend = getMonthlyTrend(tests, "createdAt");
    const attemptTrend = getMonthlyTrend(allAttempts, "submittedAt");


    const ieltsTrend = getMonthlyTrend(
        allAttempts.filter(a => a.type === "IELTS"),
        "submittedAt"
    );

    const toeicTrend = getMonthlyTrend(
        allAttempts.filter(a => a.type === "TOEIC"),
        "submittedAt"
    );
    const avgScoreTrend = +(((ieltsTrend ?? 1) + (toeicTrend ?? 1)) / 2).toFixed(2);
    useEffect(() => {
        setStatistic([
            {
                title: "Total User",
                logo: <div className='rounded-full bg-purple-100 statisticCard w-13 h-13'>
                    <FaUserAlt className='text-purple-500 text-2xl' />
                </div>,
                number: accounts.length,
                trend: userTrend,
            },
            {
                title: "Total Quiz",
                logo: <div className='rounded-full bg-yellow-100 statisticCard w-13 h-13'>
                    <FaNoteSticky className='text-yellow-500 text-2xl' />
                </div>,
                number: tests.length,
                trend: quizTrend,
            },
            {
                title: "Total Attempt",
                logo: <div className='rounded-full bg-yellow-100 statisticCard w-13 h-13'>
                    <span className="far fa-user-edit mr-1 text-2xl text-yellow-500"></span>
                </div>,
                number: allAttempts.length,
                trend: attemptTrend,
            },
            {
                title: "Average Score",
                logo: <div className='rounded-full bg-red-100 statisticCard w-13 h-13'>
                    <MdCreditScore className='text-red-500 text-2xl' />
                </div>,
                number: groupAttemptsByType(allAttempts),
                trend: avgScoreTrend,
            },
        ])
    }, [allAttempts, accounts, tests])
    console.log(statistic)
    return (
        <div className='flex justify-between items-center gap-6 mt-6'>
            {statistic.map((data, index) => (
                <React.Fragment key={index}>
                    <StatisticCard
                        title={data.title}
                        logo={data.logo}
                        number={data.number}
                        trend={data.trend.value}
                        trendPeriod={data.trend.value > 1 ? "Up from last month" : data.trend.value < 1 ? "Down from last month" : "Same with last month"}
                    />
                </React.Fragment>
            ))}
        </div>
    );
};

export default NumberStatistic;