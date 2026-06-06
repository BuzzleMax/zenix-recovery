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
  Filler,
} from 'chart.js'
import { useRecoveryScore } from '@hooks/useRecoveryScore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const RecoveryTrendChart = memo(({ timeRange = 'weekly' }) => {
  const { weeklyScores } = useRecoveryScore()

  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    quarterly: ['Month 1', 'Month 2', 'Month 3'],
  }

  const data = {
    labels: labels[timeRange],
    datasets: [
      {
        label: 'Recovery Score',
        data: weeklyScores.length > 0 ? weeklyScores : [75, 82, 78, 85, 80, 88, 84],
        borderColor: '#00FF9D',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, 'rgba(0, 255, 157, 0.3)')
          gradient.addColorStop(1, 'rgba(0, 255, 157, 0)')
          return gradient
        },
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#00FF9D',
        pointBorderColor: '#0B0F17',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#00FF9D',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
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

RecoveryTrendChart.displayName = 'RecoveryTrendChart'

export default RecoveryTrendChart
