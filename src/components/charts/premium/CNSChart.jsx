import { memo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CNSChart = memo(({ timeRange = 'weekly' }) => {
  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    quarterly: ['Month 1', 'Month 2', 'Month 3'],
  }

  const data = {
    labels: labels[timeRange],
    datasets: [
      {
        label: 'CNS Fatigue',
        data: [25, 30, 28, 35, 32, 28, 30],
        borderColor: '#A855F7',
        backgroundColor: '#A855F7',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Grip Fatigue',
        data: [20, 25, 22, 28, 25, 22, 24],
        borderColor: '#00D9FF',
        backgroundColor: '#00D9FF',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Isometric Strain',
        data: [30, 35, 32, 40, 38, 35, 36],
        borderColor: '#00FF9D',
        backgroundColor: '#00FF9D',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
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
          color: '#FFFFFF',
          font: {
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#161B26',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#00FF9D',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: (value) => `${value}%`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  )
})

CNSChart.displayName = 'CNSChart'

export default CNSChart
