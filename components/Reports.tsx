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
  const [data, setTotalRangeDateAmount] = useState<any>([{Date: '2010-01', scales: 1998},
  {Date: '2010-02', scales: 1850},
  {Date: '2010-02', scales: 1850},
])
  const [totalAmount, setTotalAmount] = useState<any>(0)
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date())

  // console.log('data fake', data)

  console.log('selectedRangeData', data)
  console.log('data', data)
  
  const config: any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
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

    const start1 = '2023-03-01T00:00:00.000Z'
    const end1 = '2023-03-31T23:59:59.999Z'
    const { data , error } :any = await supabase
      .from('orders')
      .select()
      .gte('created_at', start)
      .lte('created_at', end)
      .order('created_at', { ascending: false })
      console.log('data', data)

      let a: any= []
      data.forEach((element: any) => {
        const b =  {Date: element.created_at, scales: element.order_totals_details.totalAmount}
        a.push(b)
      });
      console.log('a', a)
     let lineGraphData = a.reduce((acc :any, obj: any) =>  {
        let Date = obj.Date
        let scales = obj.scales 

        let existingTransactionDate = acc.find((ac: any) => ac.Date === Date)

        if(existingTransactionDate) {
          existingTransactionDate.scales += scales
        }else {
         acc.push({Date, scales})
        }

        return acc
      }, [])

      console.log('line graph', lineGraphData)
      setTotalRangeDateAmount(lineGraphData)
      setTotalAmount(data?.reduce((acc: any, obj: any) => acc + obj.order_totals_details.totalAmount, 0))
      // console.log('data', data)
  }
  const selectionRange = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    key: 'selection',
  }

  return (
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
      <Line {...config} />
    </SimpleGrid>
  )
}

export default Reports
