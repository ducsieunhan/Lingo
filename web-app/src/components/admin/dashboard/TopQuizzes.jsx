import { Card, Typography, Tag } from 'antd';
import React from 'react';

const { Text, Title } = Typography;

const TopQuizzes = ({ topQuizzes }) => {
    const dataSample = [
        { title: "ETS 2024 Test 1", type: "TOEIC", attempts: 99 },
        { title: "ETS 2024 Test 2", type: "TOEIC", attempts: 96 },
        { title: "ETS 2024 Test 3", type: "TOEIC", attempts: 95 },
        { title: "ETS 2024 Test 4", type: "TOEIC", attempts: 93 },
        { title: "ETS 2024 Test 5", type: "TOEIC", attempts: 90 }
    ];

    return (

        <div className='bg-white p-6 shadow-xl rounded-xl w-full col-span-2'>

            <Title level={4} className='!text-xl !mt-0 !mb-4'>
                <span className='font-bold'>Top Quizzes</span> 🏆
            </Title>

            <div className='space-y-4'>
                {topQuizzes?.map((test, index) => (

                    <div
                        key={index}
                        className={`
                            flex items-center justify-between p-3 border-b bg-indigo-50/50 rounded-lg
                        `}
                    >
                        <Text
                            className={`
                                !text-lg font-bold w-10 text-center 
                                ${index === 0 ? 'text-indigo-600' : 'text-gray-500'}
                            `}
                        >
                            #{index + 1}
                        </Text>


                        <div className='flex-grow mx-3'>
                            <Text className='block font-semibold text-base text-gray-800 leading-snug'>
                                {test.title}
                            </Text>
                            <Tag color="blue" className='!mt-1 !mb-0'>
                                {test.type}
                            </Tag>
                        </div>
                        <div className='flex'>
                            <Text className='block text-lg font-bold text-indigo-700'>
                                {test.attempts}
                            </Text>
                            <Text className='block text-xs text-gray-500 ml-1'>
                                attempts
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopQuizzes;