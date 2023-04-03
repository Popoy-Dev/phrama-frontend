import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DateRangePicker } from 'react-date-range';
import { Box, SimpleGrid } from '@chakra-ui/react'

import { Line } from '@ant-design/plots';
import CustomerOrderReport from './reports/CustomerOrderReport'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Reports = () => {
  const [data, setData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
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
  };

  const handleSelect = (date: any) =>{
    const endDate = date.selection.endDate
    const startDate = date.selection.startDate
    setSelectedStartDate(startDate)
    setSelectedEndDate(endDate)
    console.log(date.selection.startDate); // native Date object
  }
  const selectionRange = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    key: 'selection',
  }
  console.log('selectedStartDate', selectedStartDate)
  console.log('selectedEndDate', selectedEndDate)
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
