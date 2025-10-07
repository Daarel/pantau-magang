import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, ArcElement } from "chart.js";
import { useDashboardData } from '@/hooks/useDashboardData'
// icons
import { AiOutlinePieChart } from 'react-icons/ai';

// Registrasi komponen Chart.js
ChartJS.register(Title, Tooltip, ArcElement);

export default function PieChart() {
  const { summaryData, loading, error } = useDashboardData()
  const {
    total_hadir = 0,
    total_alfa = 0,
    total_sakit_izin = 0,
  } = summaryData || {};
  const labels = ["Hadir", "Alfa", "Sakit/Izin"];
  const dataValues = [total_hadir, total_alfa, total_sakit_izin];
  const total = dataValues.reduce((acc, val) => acc + val, 0);
  const isEmptyData = total === 0;

  const percentages = total > 0 
    ? dataValues.map((v) => ((v / total) * 100).toFixed(1)) 
    : dataValues.map(() => "0.0");

  const data = {
    labels,
    datasets: [
      {
        label: "Kehadiran",
        data: dataValues,
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = percentages[context.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {/* Judul section */}
      <div className="flex items-center gap-2">
        <AiOutlinePieChart className="w-6 h-6 text-blue-500" />
        <h3 className="h4 font-semibold">Persentase Kehadiran</h3>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-red-500">Error: {error}</div>
        </div>
      ) : isEmptyData ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="text-gray-500 text-center">
            <p>Belum ada data yang dapat ditampilkan</p>
            <p className="text-sm">Data kehadiran akan muncul di sini setelah tersedia</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 md:gap-5 lg:justify-between">
          {/* Pie chart di kanan */}
          <div className="w-full max-w-[160px] md:max-w-[180px] aspect-square">
            <Pie data={data} options={options} />
          </div>

          {/* Legend manual di kiri */}
          <div className="flex gap-3">
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: data.datasets[0].backgroundColor[idx] }}
                ></div>
                <span className="text-[14px] md:text-[16px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
