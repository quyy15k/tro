import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PostChart = ({ chartData }) => {
  const [chartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Số lượng bài viết: ${context.raw}`,
        },
      },
    },
  });

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Số lượng bài viết theo tháng",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const months = chartData.map((item) => item.month);
      const postCounts = chartData.map((item) => item.postCount);

      setData({
        labels: months,
        datasets: [
          {
            label: "Số lượng bài viết theo tháng",
            data: postCounts,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [chartData]);

  return (
    <div className="max-h-[650px] w-full flex justify-center mt-10">
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

export default PostChart;
