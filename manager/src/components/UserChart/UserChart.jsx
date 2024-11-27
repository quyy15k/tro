import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = ({ chartData }) => {
  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Số lượng người dùng: ${context.raw}`;
          },
        },
      },
    },
  });

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Số lượng người dùng đăng ký",
        data: [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const months = chartData.map((item) => item.month);
      const userCounts = chartData.map((item) => item.userCount);

      setData({
        labels: months,
        datasets: [
          {
            label: "Số lượng người dùng đăng ký theo tháng",
            data: userCounts,
            borderColor: "rgba(75,192,192,1)", // Màu đường
            backgroundColor: "rgba(75,192,192,0.2)", // Màu nền
            fill: true,
          },
        ],
      });
    }
  }, [chartData]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="max-h-[650px] w-full flex justify-center mt-10">
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default UserChart;
