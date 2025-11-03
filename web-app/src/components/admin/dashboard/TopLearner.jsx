// TopLearnerList.jsx
import { Card, Typography, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;

// Assuming allTopLearnersData is imported or passed as a prop
// For this example, let's assume it's imported:
// import { allTopLearnersData } from '../data/sampleData'; // Adjust path as needed

const allTopLearnersData = [ // Redefine here for self-containment in example
    { rank: 1, name: "Alice Johnson", bestScore: "9.0", testType: "IELTS", avatar: "AJ" },
    { rank: 2, name: "Clara Williams", bestScore: "8.5", testType: "IELTS", avatar: "CW" },
    { rank: 3, name: "Eva Davis", bestScore: "8.0", testType: "IELTS", avatar: "ED" },
    { rank: 4, name: "Frank Green", bestScore: "7.8", testType: "IELTS", avatar: "FG" },
    { rank: 5, name: "Grace Hall", bestScore: "7.6", testType: "IELTS", avatar: "GH" },

    { rank: 1, name: "Bob Smith", bestScore: "980", testType: "TOEIC", avatar: "BS" },
    { rank: 2, name: "David Brown", bestScore: "965", testType: "TOEIC", avatar: "DB" },
    { rank: 3, name: "Hannah Lee", bestScore: "950", testType: "TOEIC", avatar: "HL" },
    { rank: 4, name: "Ivan King", bestScore: "930", testType: "TOEIC", avatar: "IK" },
    { rank: 5, name: "Julia Chen", bestScore: "920", testType: "TOEIC", avatar: "JC" }
];


const TopLearner = ({ testType }) => {
    // Filter learners based on the testType prop
    const filteredLearners = allTopLearnersData
        .filter(learner => learner.testType === testType)
        .sort((a, b) => parseFloat(b.bestScore) - parseFloat(a.bestScore)); // Sort by score descending

    const getTagColor = (type) => {
        return type === "IELTS" ? "geekblue" : "volcano";
    };

    return (
        <div className='bg-white p-4 shadow-lg rounded-2xl pb-6'>
            <Text className='font-bold !text-xl block mb-4'>
                Top {testType} Learners ⭐
            </Text>

            <div className='space-y-2'>
                {filteredLearners.map((learner, index) => (
                    <div
                        key={`${learner.name}-${index}`} // Unique key for mapping
                        className='flex items-center justify-between p-3 border-b last:border-b-0'
                    >
                        {/* 1. Rank */}
                        <Text className={`font-extrabold text-lg w-8 ${index === 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            #{index + 1}
                        </Text>

                        {/* 2. Avatar and Info */}
                        <div className='flex items-center flex-grow mx-3 min-w-0'>
                            <Avatar
                                size="large"
                                className={`mr-3 ${testType === "IELTS" ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}
                                icon={<UserOutlined />}
                            >
                                {learner.avatar}
                            </Avatar>
                            <div className='min-w-0'> {/* Added min-w-0 to prevent overflow */}
                                <Text strong className='block text-base truncate'>
                                    {learner.name}
                                </Text>
                                <Tag color={getTagColor(learner.testType)} className='mt-1 !mb-0'>
                                    {learner.testType}
                                </Tag>
                            </div>
                        </div>

                        {/* 3. Best Score Metric */}
                        <div className='text-right'>
                            <Text className='block font-bold text-xl text-green-700'>
                                {learner.bestScore}
                            </Text>
                            <Text type="secondary" className='text-xs'>
                                Score
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopLearner;