import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";
// icons
import { AiOutlinePieChart } from 'react-icons/ai';

// Registrasi komponen Chart.js
ChartJS.register(Title, Tooltip, ArcElement);

export default function PieChart() {
  // Data random
  const labels = ["Hadir", "Alfa", "Sakit"];
  const dataValues = labels.map(() => Math.floor(Math.random() * 100) + 10); // nilai random 10-110

  const data = {
    labels,
    datasets: [
      {
        label: "Kehadiran",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // legend: { position: "bottom" },
      // title: { display: true, text: "Pie Chart Contoh 4 Field" },
    },
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {/* Judul section */}
      <div className="flex items-center gap-2">
        <AiOutlinePieChart className="w-6 h-6 text-blue-500" />
        <h3 className="h4 font-semibold">Persentase Kehadiran</h3>
      </div>
      <div className="flex items-center gap-5 md:gap-10">
        {/* Legend manual di kiri */}
        <div className="flex flex-col gap-3">
          {labels.map((label, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: data.datasets[0].backgroundColor[idx] }}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="w-full max-w-[180px] md:max-w-[180px] aspect-square">
          <Pie data={data} options={options} />
        </div>
      </div>

    </div>
  );
}
