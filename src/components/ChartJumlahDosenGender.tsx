import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartJumlahMataKuliah = () => {
  const data = {
    labels: ['≥ 3 Mata Kuliah', '< 3 Mata Kuliah'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#ef4444', '#fca5a5'],
        borderColor: '#ffffff', // garis pemisah slice
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,       // ❌ tidak ada animasi
    cutout: '50%',          // ✅ donut
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#374151',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartJumlahMataKuliah;
