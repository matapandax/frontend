import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartGender = () => {
  const data = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#ef4444', '#fca5a5'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true, // ❌ nonaktifkan semua animasi
    cutout: '50%',    // ✅ ubah menjadi donut
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

export default ChartGender;
