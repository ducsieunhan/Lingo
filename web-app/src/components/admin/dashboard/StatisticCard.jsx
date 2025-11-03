import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineTrendingFlat } from "react-icons/md";

const StatisticCard = ({ title, logo, number, trend, trendPeriod }) => {
    const [trendDesc, setTrendDesc] = useState();
    if (typeof number !== "number") {
        console.log("number is not a number:", number);
    }
    useEffect(() => {
        setTrendDesc(
            <div className='flex gap-2 items-center text-sm'>
                {trend > 1 ? (

                    <span className='text-green-600 flex items-center gap-1'>
                        <FaArrowTrendUp />
                        <span>{Math.round(trend * 10) / 10} %</span>
                    </span>
                ) : trend < 1 ? (

                    <span className='text-red-600 flex items-center gap-1'>
                        <FaArrowTrendDown />
                        <span>{Math.round((1 - trend) * 100)} %</span>
                    </span>
                ) : (

                    <span className="text-gray-600 flex items-center gap-1">
                        <MdOutlineTrendingFlat className="!text-2xl" />
                    </span>

                )}

                <span className='text-black'>{trendPeriod}</span>
            </div>
        );
    }, [trend, trendPeriod]);


    return (

        <Card className='rounded-xl shadow-md border w-full'>

            <div className='flex justify-between p-3 items-start'>
                <div className='flex flex-col'>

                    <p className='text-gray-500 font-semibold'>{title}</p>
                    <span className="font-bold text-2xl">
                        {typeof number === "number" ? (
                            number.toLocaleString()
                        ) : (
                            <div className="flex items-baseline space-x-3">

                                <span className="flex items-baseline">
                                    <span className="text-xl font-semibold">
                                        {number["IELTS"][0]?.averageScore}
                                    </span>
                                    <span className="text-sm ml-1 text-gray-500">IELTS</span>
                                </span>

                                <span className="text-gray-300">|</span>

                                <span className="flex items-baseline">
                                    <span className="text-xl font-semibold">
                                        {Math.round(number["TOEIC"][0]?.averageScore) || ""}
                                    </span>
                                    <span className="text-sm ml-1 text-gray-500">TOEIC</span>
                                </span>
                            </div>
                        )}
                    </span>


                </div>
                <div className=''>
                    {logo}
                </div>
            </div>

            <div className='p-3 pt-0'>
                {typeof number === "number" ? trendDesc : "Not show trend"}
            </div>
        </Card>
    );
};

export default StatisticCard;