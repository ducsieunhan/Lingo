import React, { useState } from 'react';
import { Select, Space, Table, Tag } from 'antd';
import { formatTime, getCategoryStyle, getScoreStyle } from '../../../service/GlobalFunction';
import { BackwardFilled, ClockCircleFilled, ClockCircleOutlined, EyeFilled, EyeInvisibleOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { realData } from '../../../data/MockData';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
const columns = [
  {
    title: 'Date',
    dataIndex: 'submittedAt',
    key: 'submittedAt',
    sorter: (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime(),
    render: (_, record) => (
      <div>
        <div className="text-sm font-medium text-gray-900">{record.submittedAt.split("T")[0].split("-").join("/")}</div>
        {/* <div className="text-sm text-gray-500">{record.submittedAt.split("T")[1].split(".")[0]}</div> */}
      </div>
    )
  },
  {
    title: 'Test title',
    dataIndex: 'quizInfo',
    render: (_, record) => (
      <div>
        <div className="text-sm font-medium text-gray-900">IELTS Academic Reading Practice Test 1</div>
        {/* <div className="text-sm text-gray-500">{record.quizInfo.details}</div> */}
      </div>
    )
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (_, record) => {
      const { bg, text } = getCategoryStyle(record.type);
      return (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${bg} ${text}`}>
          <span className="font-medium">{record.type}</span>
          <div className="flex items-center gap-1">
            {record.sectionResults?.map((sec, idx) => (
              <span key={idx} className="text-xs font-normal">
                {sec.type}
              </span>
            ))}
          </div>
        </div>
      );
    }
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    render: (_, record) => {
      // Tính toán dữ liệu
      const totalCorrect = record.sectionResults?.reduce(
        (sum, sec) => sum + (sec.correctAnswers || 0),
        0
      ) || 0;

      const totalQuestions = record.sectionResults?.reduce(
        (sum, sec) => sum + (sec.totalQuestions || 0),
        0
      ) || 1;

      // const accuracy = ((totalCorrect / totalQuestions) * 100).toFixed(0);

      let mainScore = "";
      let maxScore = "";
      let displayScore = 0;

      if (record.type === "IELTS") {
        displayScore = record?.score;
        mainScore = `${record?.score}/9.0`;
      } else if (record.type === "TOEIC") {
        displayScore = record.sectionResults?.reduce(
          (sum, sec) => sum + (sec.sectionScore || 0),
          0
        ) || 0;
        maxScore = record.sectionResults?.reduce(
          (sum, sec) => sum + (sec.maxPossibleScore || 0),
          0
        ) || 990;
        mainScore = `${displayScore}/${maxScore}`;
      } else if (record.type === "TOEFL") {
        displayScore = record.sectionResults?.reduce(
          (sum, sec) => sum + (sec.sectionScore || 0),
          0
        ) || 0;
        maxScore = record.sectionResults?.reduce(
          (sum, sec) => sum + (sec.maxPossibleScore || 0),
          0
        ) || 120;
        mainScore = `${displayScore}/${maxScore}`;
      }

      const colorClass = getScoreStyle(record.type, displayScore);

      return (
        <div className="text-sm  flex flex-row items-center space-x-2">
          <div className={`inline-block px-2 py-1 rounded-2xl font-medium ${colorClass}`}>
            {mainScore}
          </div>
          {/* <div>
            <div className="text-sm text-gray-500">{totalCorrect}/{totalQuestions} đúng</div>
            <div className="text-sm text-gray-500">{accuracy}% chính xác</div>
          </div> */}
        </div>
      );
    }
  },
  {
    title: 'Time',
    dataIndex: 'timeTaken',
    key: 'timeTaken',
    render: (_, record) => <div> <ClockCircleOutlined /> {formatTime(record.timeTaken)}</div>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link className="!text-blue-600 hover:!text-blue-900 !mr-3"><EyeOutlined /> Detail</Link>
        <Link className="!text-green-600 hover:!text-green-900"><ReloadOutlined /> Retry</Link>
      </Space>
    ),
  },
];



const HistoryAttempt = () => {
  const { attempts } = useSelector(state => state.attempts);

  const [hisType, setHisType] = useState("");
  const [hisTime, setHisTime] = useState("30");


  const filterByType = (list, type) => {
    if (!type) return list;
    return list.filter(attempt => attempt?.sectionResults?.[0]?.type.toLowerCase() === type.toLowerCase());
  };

  const filterByTime = (list, time) => {
    if (!time) return list;

    const now = dayjs();
    let threshold;

    if (time === "30") {
      threshold = now.subtract(30, "day");
    } else if (time === "7") {
      threshold = now.subtract(7, "day");
    } else if (time === "3") {
      threshold = now.subtract(3, "month");
    }

    return list.filter(attempt => dayjs(attempt.submittedAt).isAfter(threshold));
  };

  // Áp dụng filter
  let filteredAttempts = filterByType(attempts, hisType);
  filteredAttempts = filterByTime(filteredAttempts, hisTime);

  return (
    <>
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">History</h2>
          <div className="flex items-center !space-x-3">
            <Select
              defaultValue="All "
              style={{ width: 120 }}
              onChange={(value) => setHisType(value)}
              options={[
                { value: '', label: 'All ' },
                { value: 'Reading', label: 'Reading' },
                { value: 'Listening', label: 'Listening' },
                { value: 'Writing', label: 'Writing' },
                { value: 'Speaking', label: 'Speaking' },
              ]}
            />
            <Select
              defaultValue="30"
              style={{ width: 120 }}
              onChange={(value) => setHisTime(value)}
              options={[
                { value: '30', label: 'The last 30 day' },
                { value: '7', label: 'The last 7 day' },
                { value: '3', label: 'The last 3 month' },
                { value: '', label: 'All' },
              ]}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={filteredAttempts}
        // locale={{ emptyText: <span style={{ color: "red" }}>Danh sách trống!</span> }}
        locale={{ emptyText: "Danh sách trống!" }}
        pagination={{
          pageSize: 8,
          showTotal: (total, range) =>
            `Hiển thị ${range[0]} đến ${range[1]} trong tổng số ${total} kết quả`,
        }}
      />
    </>
  );
};


export default HistoryAttempt;