import React from 'react';
import { Table, Tag, Typography, Button, Avatar } from 'antd';
import { ClockCircleOutlined, UserOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const userMap = {
    "1": { name: "Learner-001", initials: "L1" },
    "2": { name: "Ace-Quizzer", initials: "AQ" },
    "3": { name: "TOEIC_Pro", initials: "TP" },
    "4": { name: "IELTS_Seeker", initials: "IS" },
};

const attemptsData = [
    {
        key: '101-1', quizId: 101, testTitle: "TOEIC Full Test 2024 - Set A", userId: "1", score: 850, timeTaken: 3600, submittedAt: "2025-10-23T06:00:00.000Z", type: "TOEIC",
        userName: userMap["1"].name, userAvatar: userMap["1"].initials
    },
    {
        key: '102-2', quizId: 102, testTitle: "IELTS Academic Mock Test 3", userId: "2", score: 7.5, timeTaken: 3400, submittedAt: "2025-10-23T06:30:00.000Z", type: "IELTS",
        userName: userMap["2"].name, userAvatar: userMap["2"].initials
    },
    {
        key: '103-3', quizId: 103, testTitle: "TOEIC Listening Practice 15", userId: "3", score: 410, timeTaken: 1200, submittedAt: "2025-10-22T15:00:00.000Z", type: "TOEIC",
        userName: userMap["3"].name, userAvatar: userMap["3"].initials
    },
    {
        key: '104-4', quizId: 104, testTitle: "IELTS General Reading Test", userId: "4", score: 6.0, timeTaken: 2500, submittedAt: "2025-10-22T10:00:00.000Z", type: "IELTS",
        userName: userMap["4"].name, userAvatar: userMap["4"].initials
    },
];

const columns = [
    {
        title: 'Learner',
        dataIndex: 'userName',
        key: 'userName',
        width: 150,
        render: (text, record) => (
            <div className="flex items-center">
                <Avatar
                    size="small"
                    className={`mr-2 ${record.type === 'TOEIC' ? 'bg-orange-200 text-orange-700' : 'bg-blue-200 text-blue-700'}`}
                    icon={<UserOutlined />}
                >
                    {record.userAvatar}
                </Avatar>
                <Text strong className='ml-2'>{text}</Text>
            </div>
        ),
    },
    {
        title: 'Quiz Title',
        dataIndex: 'testTitle',
        key: 'testTitle',
        width: 300,
        render: (text, record) => (
            <>
                <Text>{text}</Text>
                <Tag color={record.type === 'TOEIC' ? 'volcano' : 'geekblue'} className="!ml-2">
                    {record.type}
                </Tag>
            </>
        ),
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 100,
        sorter: (a, b) => a.score - b.score,
        render: (score, record) => (
            <Text className="font-medium text-base text-green-600">
                {score} {record.type === 'IELTS' ? 'Band' : ''}
            </Text>
        ),
    },
    {
        title: 'Time Taken',
        dataIndex: 'timeTaken',
        key: 'timeTaken',
        width: 120,
        render: (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return (
                <Text type="secondary" className="text-xs">
                    <ClockCircleOutlined className="mr-1" />
                    {minutes}m {seconds}s
                </Text>
            );
        }
    },
    {
        title: 'Date',
        dataIndex: 'submittedAt',
        key: 'submittedAt',
        width: 150,
        render: (dateString) => new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        }),
    },
    {
        title: 'Action',
        key: 'action',
        width: 100,
        render: () => (
            <Button type="link" size="small" icon={<RightCircleOutlined />}>
                View
            </Button>
        ),
    },
];


const CurrentAttemptsTable = () => {
    const { allAttempts } = useSelector(state => state.attempts);
    const { tests } = useSelector(state => state.tests);
    const { accounts } = useSelector(state => state.accounts);

    const tableData = allAttempts.map(attempt => {
        const account = accounts.find(acc => String(acc.id) === String(attempt.userId));
        const test = tests.find(t => t.id === attempt.quizId);

        return {
            key: `${attempt.quizId}-${attempt.userId}`,
            quizId: attempt.quizId,
            testTitle: test?.title || "Unknown Test",
            userId: attempt.userId,
            score: attempt.score,
            timeTaken: attempt.timeTaken,
            submittedAt: attempt.submittedAt,
            type: test?.type || "N/A",

            userName: account?.username || "Unknown User",

            userAvatar: account?.username
                ? account.username.substring(0, 2).toUpperCase()
                : "??"
        };
    });


    return (
        <div className='bg-white p-6 shadow-xl rounded-xl mt-10'>
            <Typography.Title level={3} className='!mt-0 !mb-4'>
                Recent Quiz Attempts
            </Typography.Title>

            <Table
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 'max-content' }}
                className="custom-attempts-table"
            />
        </div>
    );
};


export default CurrentAttemptsTable;