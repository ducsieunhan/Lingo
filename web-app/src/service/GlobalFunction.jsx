import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const categoryStyles = {
  ielts: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  toeic: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  toefl: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  sat: {
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  vstep: {
    bg: "bg-pink-100",
    text: "text-pink-800",
  },
  gmat: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  gre: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
  pte: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  moet: {
    bg: "bg-teal-100",
    text: "text-teal-800",
  },
  cambridge: {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
  },
  all: {
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
};

export function getCategoryStyle(type) {
  const key = type?.toLowerCase();
  return categoryStyles[key] || categoryStyles["all"];
}

export function getScoreStyle(type, score) {
  const key = type?.toLowerCase();

  if (key === "toeic") {
    if (score < 300) return "bg-red-100 text-red-800";
    if (score < 600) return "bg-orange-100 text-orange-800";
    if (score < 800) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  }

  if (key === "ielts") {
    if (score < 4.5) return "bg-red-100 text-red-800";
    if (score < 6.0) return "bg-orange-100 text-orange-800";
    if (score < 7.5) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  }

  if (key === "toefl") {
    if (score < 40) return "bg-red-100 text-red-800";
    if (score < 80) return "bg-orange-100 text-orange-800";
    if (score < 100) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  }

  return "bg-gray-100 text-gray-800";
}

dayjs.extend(utc);
dayjs.extend(timezone);
const TZ = 'Asia/Ho_Chi_Minh';
export function getDailyStreak(attempts, { timezone = TZ, endAtToday = true } = {}) {
  if (!Array.isArray(attempts) || attempts.length === 0) {
    return { currentStreak: 0, maxStreak: 0, uniqueDays: [] };
  }

  // Lấy list ngày (YYYY-MM-DD) theo timezone, loại trùng
  const daySet = new Set(
    attempts.map(a =>
      dayjs(a.submittedAt).tz(timezone).format('YYYY-MM-DD')
    )
  );

  // Sắp xếp tăng dần theo ngày
  const uniqueDays = Array.from(daySet).sort((d1, d2) =>
    dayjs(d1).isBefore(dayjs(d2)) ? -1 : 1
  );

  // Tính maxStreak qua toàn bộ chuỗi ngày unique
  let maxStreak = 0;
  let current = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = dayjs(uniqueDays[i - 1]);
    const curr = dayjs(uniqueDays[i]);
    const diff = curr.diff(prev, 'day');
    if (diff === 1) {
      current += 1;
    } else {
      maxStreak = Math.max(maxStreak, current);
      current = 1;
    }
  }
  maxStreak = Math.max(maxStreak, current);

  // Tính currentStreak (chuỗi kết thúc ở hôm nay hoặc ở ngày cuối cùng có dữ liệu)
  const today = dayjs().tz(timezone).format('YYYY-MM-DD');
  const lastDay = uniqueDays[uniqueDays.length - 1];

  // Nếu yêu cầu kết thúc ở hôm nay nhưng hôm nay chưa có attempt, kiểm tra xem có liền kề hôm qua không
  // Quy ước:
  // - endAtToday = true: streak reset nếu hôm nay không có attempt (currentStreak = 0),
  //   hoặc nếu có attempt hôm nay thì đếm lùi về các ngày liền kề trước đó.
  // - endAtToday = false: streak kết thúc ở ngày cuối cùng có dữ liệu (lastDay), đếm lùi.
  let currentStreak = 0;

  if (endAtToday) {
    if (!daySet.has(today)) {
      currentStreak = 0;
    } else {
      // Bắt đầu từ hôm nay, đếm lùi
      currentStreak = 1;
      let cursor = dayjs(today);
      while (true) {
        const prevDay = cursor.subtract(1, 'day').format('YYYY-MM-DD');
        if (daySet.has(prevDay)) {
          currentStreak += 1;
          cursor = cursor.subtract(1, 'day');
        } else {
          break;
        }
      }
    }
  } else {
    // Bắt đầu từ ngày cuối cùng có dữ liệu, đếm lùi
    currentStreak = 1;
    let cursor = dayjs(lastDay);
    while (true) {
      const prevDay = cursor.subtract(1, 'day').format('YYYY-MM-DD');
      if (daySet.has(prevDay)) {
        currentStreak += 1;
        cursor = cursor.subtract(1, 'day');
      } else {
        break;
      }
    }
  }

  return { currentStreak, maxStreak, uniqueDays };
}