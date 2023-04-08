import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'react-date-range'
import { Box, SimpleGrid } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import CustomerOrderReport from './reports/CustomerOrderReport'
import { supabase } from '../supabaseClient'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
const Line = dynamic(
  () => import('@ant-design/plots').then(({ Line }) => Line),
  { ssr: false }
)

const Reports = () => {
  const today = new Date();
  const formattedNextMonth = `${today.getFullYear()}-${(today.getMonth() + 2).toString().padStart(2, '0')}`;
  
  const [data, setTotalRangeDateAmount] = useState<any>([
    { Date: formattedNextMonth + '-01', scales: 1998 },
    { Date: formattedNextMonth + '-02', scales: 1850 },
    { Date: formattedNextMonth + '-03', scales: 1850 },
  ]);
  
  const [totalAmount, setTotalAmount] = useState<any>(0)
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date())

  const config: any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    smooth: true,
    xAxis: {
      type: 'timeCat',
      tickCount: 30,
    },
  }

  const handleSelect = async (date: any) => {
    const { startDate, endDate } = date.selection

    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)

    const start = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10)
    const end = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10)

    const { data, error }: any = await supabase
      .from('orders')
      .select()
      .gte('created_at', start)
      .lte('created_at', end)
      .order('created_at', { ascending: false })

    let dataArray: any = []
    data.forEach((element: any) => {
      const newArray = {
        Date: element.created_at,
        scales: element.order_totals_details.totalAmount,
      }
      dataArray.push(newArray)
    })
    let lineGraphData = dataArray.reduce((acc: any, obj: any) => {
      let Date = obj.Date
      let scales = obj.scales

      let existingTransactionDate = acc.find((ac: any) => ac.Date === Date)

      if (existingTransactionDate) {
        existingTransactionDate.scales += scales
      } else {
        acc.push({ Date, scales })
      }

      return acc
    }, [])

    setTotalRangeDateAmount(lineGraphData)
    setTotalAmount(
      data?.reduce(
        (acc: any, obj: any) => acc + obj.order_totals_details.totalAmount,
        0
      )
    )
  }
  const selectionRange = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    key: 'selection',
  }

  return (
  <>
    <SimpleGrid columns={2} spacing={10}>
      <Box bg='white' height='80px'>
        {' '}
        <CustomerOrderReport />{' '}
      </Box>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        rangeColors={['red']}
        showDateDisplay
      />
    </SimpleGrid>
      <SimpleGrid columns={1} spacing={10} p={20}> 
      <Line {...config} />

    </SimpleGrid>
  </>
  )
}

export default Reports
