import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(Title, Tooltip, ArcElement);

export default function PieChart() {
  // Data random
  const labels = ["Present", "Absent", "Late", "early_leave"];
  const dataValues = labels.map(() => Math.floor(Math.random() * 100) + 10); // nilai random 10-110

  const data = {
    labels,
    datasets: [
      {
        label: "Penjualan",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { position: "bottom" },
      // title: { display: true, text: "Pie Chart Contoh 4 Field" },
    },
  };

  return (
    <div className='flex items-center justify-center w-2/3 xl:w-1/2'>
      <Pie data={data} options={options} />
    </div>
  );
}
