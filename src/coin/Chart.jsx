import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];
  const backgroundColors = [];
  const borderColors = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
    // Generate a random color for each data point
    const randomColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.9)`;
    backgroundColors.push(randomColor);
    borderColors.push(randomColor);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Line options={{ responsive: true }} data={data} />;
};

export default Chart;
