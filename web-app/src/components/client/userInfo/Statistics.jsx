import { Row, Col, Card } from "antd";
import dayjs from "dayjs";
import {
  FaClipboardList, FaClock, FaBullseye, FaStar,
  FaStopwatch, FaTrophy, FaFire
} from "react-icons/fa";
import { getDailyStreak } from "../../../service/GlobalFunction";

function safeAverage(arr, fn) {
  return arr.length
    ? arr.reduce((acc, cur) => acc + fn(cur), 0) / arr.length
    : 0;
}

function roundNearest5(num) {
  return Math.round(num / 5) * 5;
}

function getAccuracy(attempt) {
  const totalCorrect = attempt.sectionResults.reduce((acc, sec) => acc + sec.correctAnswers, 0);
  const totalQuestions = attempt.sectionResults.reduce((acc, sec) => acc + sec.totalQuestions, 0);
  return totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
}

export default function Statistics({ attemptData = [] }) {
  const now = dayjs();
  const totalDone = attemptData.length;
  const threshold = now.subtract(7, "day");

  const weeklyAttempts = attemptData.filter(a => dayjs(a.submittedAt).isAfter(threshold));
  const totalPerWeek = weeklyAttempts.length;

  const totalHour = attemptData.reduce((acc, cur) => acc + cur.timeTaken, 0) / 3600;
  const totalHourWeek = weeklyAttempts.reduce((acc, cur) => acc + cur.timeTaken, 0) / 3600;

  const thisMonth = dayjs().month();
  const lastMonth = dayjs().subtract(1, "month").month();

  const thisMonthAttempts = attemptData.filter(a => dayjs(a.submittedAt).month() === thisMonth);
  const lastMonthAttempts = attemptData.filter(a => dayjs(a.submittedAt).month() === lastMonth);

  const accuracyThisMonth = safeAverage(thisMonthAttempts, getAccuracy);
  const accuracyLastMonth = safeAverage(lastMonthAttempts, getAccuracy);
  const changeAcc = accuracyLastMonth
    ? ((accuracyThisMonth - accuracyLastMonth) / accuracyLastMonth) * 100
    : 0;

  const totalAccuracy = attemptData.length
    ? safeAverage(attemptData, getAccuracy).toFixed(2)
    : 0;

  const averageThisMonth = safeAverage(thisMonthAttempts, a => a.score);
  const averageLastMonth = safeAverage(lastMonthAttempts, a => a.score);
  const changeAverage = averageLastMonth
    ? ((averageThisMonth - averageLastMonth) / averageLastMonth) * 100
    : 0;

  const totalAverage = attemptData.length
    ? safeAverage(attemptData, a => a.score).toFixed(0)
    : 0;

  // Streak
  const { currentStreak, maxStreak } = getDailyStreak(attemptData, { endAtToday: false });

  const StatCard = ({ icon, value, label, change, iconBg = "bg-gray-100" }) => (
    <Card className="shadow-md hover:shadow-xl rounded-lg transition ease-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        {change && <span className="text-sm text-green-600 font-medium">{change}</span>}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </Card>
  );

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} md={12} lg={6}>
          <StatCard
            icon={<FaClipboardList className="text-blue-600 text-xl" />}
            iconBg="bg-blue-100"
            value={totalDone}
            label="Tổng số đề thi đã làm"
            change={`+${totalPerWeek} tuần này`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard
            icon={<FaClock className="text-green-600 text-xl" />}
            iconBg="bg-green-100"
            value={totalHour.toFixed(1)}
            label="Giờ luyện tập"
            change={`+${totalHourWeek.toFixed(1)}h tuần này`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard
            icon={<FaBullseye className="text-purple-600 text-xl" />}
            iconBg="bg-purple-100"
            value={`${totalAccuracy}%`}
            label="Độ chính xác"
            change={`+${changeAcc.toFixed(1)}% tháng này`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard
            icon={<FaStar className="text-orange-600 text-xl" />}
            iconBg="bg-orange-100"
            value={roundNearest5(totalAverage)}
            label="Điểm trung bình"
            change={`+${changeAverage.toFixed(1)} tháng này`}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} md={8}>
          <StatCard
            icon={<FaStopwatch className="text-indigo-600 text-lg" />}
            iconBg="bg-indigo-100"
            value={totalDone ? (totalHour / totalDone * 60).toFixed(1) : 0}
            label="Thời gian trung bình (phút)"
          />
        </Col>
        <Col xs={24} md={8}>
          <StatCard
            icon={<FaTrophy className="text-yellow-600 text-lg" />}
            iconBg="bg-yellow-100"
            value={attemptData.length ? Math.max(...attemptData.map(a => a.score)) : 0}
            label="Điểm cao nhất"
          />
        </Col>
        <Col xs={24} md={8}>
          <StatCard
            icon={<FaFire className="text-red-600 text-lg" />}
            iconBg="bg-red-100"
            value={` ${maxStreak}`}
            label="Streak dài nhất"
          />
        </Col>
      </Row>
    </div>
  );
}
