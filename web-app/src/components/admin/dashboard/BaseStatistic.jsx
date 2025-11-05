import React from 'react';
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import TopQuizzes from './TopQuizzes';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BaseStatistic = ({ sampleData, type, label, topQuizzes }) => {


    let color, labelText, chartTitle, yAxisTitle, isScoreChart, chartType;


    if (type === "score-ielts") {
        color = "rgb(59, 130, 246)";
        labelText = "Average IELTS Band Score";
        chartTitle = "Average Score of Top IELTS Quizzes";
        yAxisTitle = "IELTS Band Score";
        isScoreChart = true;
        chartType = Bar;
    } else if (type === "score-toeic") {
        color = "rgb(234, 88, 12)";
        labelText = "Average TOEIC Score";
        chartTitle = "Average Score of Top TOEIC Quizzes";
        yAxisTitle = "TOEIC Score";
        isScoreChart = true;
        chartType = Bar;
    } else {
        color = "rgb(16, 185, 129)";
        labelText = "No. of attempts";
        chartTitle = "Number of Attempts of Quizzes";
        yAxisTitle = "Attempts";
        isScoreChart = false;
        chartType = Line;
    }


    const safeSampleData = Array.isArray(sampleData) ? sampleData : [];
    const safeLabels = Array.isArray(label) ? label : [];

    const minVal = safeSampleData.length ? Math.min(...safeSampleData) : 0;
    const maxVal = safeSampleData.length ? Math.max(...safeSampleData) : 0;

    let calculatedMax, calculatedStepSize;

    if (type === "score-ielts") {
        calculatedMax = 9.0;
        calculatedStepSize = 0.5;
    } else {
        const safeMax = Math.max(5, maxVal);

        if (safeMax <= 10) {
            calculatedStepSize = 1;
            calculatedMax = 10;
        } else if (safeMax <= 50) {
            calculatedStepSize = 2;
            calculatedMax = Math.ceil((safeMax + 2) / 2) * 2;
        } else if (safeMax <= 100) {
            calculatedStepSize = 5;
            calculatedMax = Math.ceil((safeMax + 5) / 5) * 5;
        } else {
            const range = safeMax - minVal;
            const baseStep = range / 8;
            const pow = Math.pow(10, Math.floor(Math.log10(baseStep)));

            calculatedStepSize = Math.ceil(baseStep / pow) * pow;
            calculatedMax = Math.ceil((safeMax + calculatedStepSize) / calculatedStepSize) * calculatedStepSize;
        }
    }


    const data = {
        labels: safeLabels,
        datasets: [
            {
                label: labelText,
                data: safeSampleData,


                borderColor: color,
                backgroundColor: isScoreChart ? color.replace('rgb', 'rgba').replace(')', ', 0.8)') : color.replace('rgb', 'rgba').replace(')', ', 0.2)'), // Solid bar color, filled line area


                tension: isScoreChart ? 0 : 0.3,
                fill: !isScoreChart,
                pointBorderColor: color,
                pointBackgroundColor: "#fff",
                pointRadius: isScoreChart ? 0 : 6,
                pointHoverRadius: isScoreChart ? 0 : 8,

                borderRadius: 5,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: chartTitle,
                font: { size: 18, weight: '600' },
                color: '#1F2937'
            },
            legend: { display: true, position: 'top', labels: { usePointStyle: true } },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                min: 0,
                max: calculatedMax,
                ticks: {
                    stepSize: calculatedStepSize,
                    color: '#4B5563'
                },
                grid: { borderDash: [5, 5], color: '#E5E7EB' },
                title: {
                    display: true,
                    text: yAxisTitle,
                    font: { weight: 'bold' }
                }
            },
            x: {
                ticks: { color: '#4B5563' },
                grid: { display: false }
            }
        }
    };


    const ChartComponent = chartType;

    const outerContainerClasses = `bg-gray-50 mt-4 gap-4 w-full ${type === "attempt" ? 'grid grid-cols-6' : ''}`;
    const chartContainerClasses = `w-full bg-white shadow-xl rounded-xl p-6 md:p-10 ${type === "attempt" ? 'col-span-4' : ''}`;

    return (
        <div className={outerContainerClasses}>
            <div className={chartContainerClasses}>

                <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
                    {chartTitle}
                </h1>

                <div className="relative h-96">
                    <ChartComponent data={data} options={options} />
                </div>

                <div className="mt-8 text-sm text-gray-500 text-center">
                    Data represents average scores of top quizzes.
                </div>
            </div>


            {type === "attempt" && <TopQuizzes topQuizzes={topQuizzes} />}
        </div>
    );
};

export default BaseStatistic;