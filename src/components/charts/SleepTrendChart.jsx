import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js/auto'
import { motion } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const SleepTrendChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Sleep (hours)',
        data: data || [7, 8, 6.5, 7.5, 8, 9, 7.5],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: '#9333EA',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Deep Sleep (hours)',
        data: data ? data.map(d => d * 0.3) : [2.1, 2.4, 2, 2.25, 2.4, 2.7, 2.25],
        backgroundColor: 'rgba(0, 255, 157, 0.8)',
        borderColor: '#00FF9D',
        borderWidth: 2,
        borderRadius: 8,
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
        max: 12,
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-64"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  )
}

export default SleepTrendChart
