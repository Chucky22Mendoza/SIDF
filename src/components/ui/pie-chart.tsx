import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Registrar componentes necesarios para PieChart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  dataLabels: string[];
  dataValues: number[];
  colors?: 0 | 1;
}

function PieChart({ dataLabels, dataValues, colors = 0 }: PieChartProps) {
  const pullColors1 = [
    '220, 38, 38',
    '255, 71, 71',
    '190, 30, 30',
    '220, 100, 100',
    '240, 128, 128'
  ];

  const pullColors2 = [
    '239, 68, 68',
    '200, 30, 30',
    '255, 99, 99',
    '187, 12, 12',
    '255, 132, 132'
  ];

  const colorsSelection = [pullColors1, pullColors2][colors];

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Total',
        data: dataValues,
        backgroundColor: [
          `rgba(${colorsSelection[0]}, 0.8)`,
          `rgba(${colorsSelection[1]}, 0.8)`,
          `rgba(${colorsSelection[2]}, 0.8)`,
          `rgba(${colorsSelection[3]}, 0.8)`,
          `rgba(${colorsSelection[4]}, 0.8)`,
        ],
        borderColor: [
          `rgba(${colorsSelection[0]}, 1)`,
          `rgba(${colorsSelection[1]}, 1)`,
          `rgba(${colorsSelection[2]}, 1)`,
          `rgba(${colorsSelection[3]}, 1)`,
          `rgba(${colorsSelection[4]}, 1)`,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
