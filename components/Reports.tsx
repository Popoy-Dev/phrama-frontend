import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Box, SimpleGrid } from '@chakra-ui/react'
import CustomerOrderReport from './reports/CustomerOrderReport'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Fayne Pharma Sell Chart',
    },
  },
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(61, 50, 52, 0.5)',
    },
  ],
}

const Reports = () => {
  return (
    <SimpleGrid columns={2} spacing={10}>
  <Box bg='tomato' height='80px'> <CustomerOrderReport /> </Box>
  <Box bg='white' w='100%' p={4} color='white' borderRadius='md'>
      <Bar options={options} data={data} />
    </Box>
</SimpleGrid>
  
  )
}

export default Reports
