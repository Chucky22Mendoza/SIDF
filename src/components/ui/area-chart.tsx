import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

interface AreaChartProps {
  dataPoints?: number[];
  labels?: string[];
}

function AreaChart ({ dataPoints = [], labels = [] }: AreaChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Copias prestadas',
        data: dataPoints,
        borderColor: 'rgba(220, 38, 38, 1)',
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            offset: true,

          },
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
};

export default AreaChart;
