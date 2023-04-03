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
  const [data, setData] = useState([])
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date())
  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error)
      })
  }
  // console.log('data', data)
  const config: any = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 100,
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

    const { data, error } = await supabase
      .from('orders')
      .select()
      .lt('created_at', start)
      .gt('created_at', end)
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
