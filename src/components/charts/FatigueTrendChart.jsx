import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js/auto'
import { motion } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const FatigueTrendChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Chest',
        data: data?.chest || [65, 70, 60, 55, 50, 45, 40],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Shoulders',
        data: data?.shoulders || [45, 50, 55, 50, 45, 40, 35],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Forearms',
        data: data?.forearms || [30, 35, 40, 35, 30, 25, 20],
        borderColor: '#00FF9D',
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Back',
        data: data?.back || [55, 60, 55, 50, 45, 40, 35],
        borderColor: '#00D9FF',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#F8FAFC',
          usePointStyle: true,
          padding: 20,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: '#161B26',
        titleColor: '#F8FAFC',
        bodyColor: '#F8FAFC',
        borderColor: '#2A3242',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(42, 50, 66, 0.3)',
        },
        ticks: {
          color: '#F8FAFC',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#F8FAFC',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-64"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  )
}

export default FatigueTrendChart
