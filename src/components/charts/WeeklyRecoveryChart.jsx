import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js/auto'
import { motion } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const WeeklyRecoveryChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Recovery Score',
        data: data || [75, 82, 78, 85, 88, 80, 85],
        borderColor: '#00FF9D',
        backgroundColor: 'rgba(0, 255, 157, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00FF9D',
        pointBorderColor: '#0B0F17',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#161B26',
        titleColor: '#F8FAFC',
        bodyColor: '#F8FAFC',
        borderColor: '#2A3242',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 50,
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
      transition={{ duration: 0.5 }}
      className="h-64"
    >
      <Line data={chartData} options={options} />
    </motion.div>
  )
}

export default WeeklyRecoveryChart
