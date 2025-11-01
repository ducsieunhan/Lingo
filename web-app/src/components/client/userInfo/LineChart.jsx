import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const LineChart = ({ attemptData }) => {
  const scoreData = attemptData.map(a => a.score).slice(0, 10);
  const dateData = attemptData
    .map(a => a.submittedAt.split("T")[0])
    // .concat(Array(10).fill(null))
    .slice(0, 10);

  // console.log(aData);


  const data = {
    labels: dateData,
    datasets: [
      {
        label: "Điểm số",
        data: scoreData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,

      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Biểu đồ điểm số 10 lần gần nhất',
        align: 'start',
        font: {
          size: 20
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#3b82f6",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#6b7280",
          // stepSize: 100,
          padding: 1
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          // maxRotation: 65,
          // minRotation: 65,
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "#3b82f6",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
