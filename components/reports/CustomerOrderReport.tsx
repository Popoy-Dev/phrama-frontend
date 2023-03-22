import {
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

interface CustomerOrder {
  id: number
  products: {
    name: string
    category: string
    generic_name: string
  }
  quantity: number
  srp_price: 6
  created_at: string
  discounted: boolean
  is_vatable: boolean
  product_id: number
  expiry_date: string
  batch_nubmer: number
  product_order: number
  order_quantity: number
  ordered_quantity: number
  manufacture_pruce: number
}

interface OrderTotalDetails {
  totalAmount: number
  removeTotalDiscount: number
  removetotalQuantity: number
}
interface OrderData {
  id: number
  created_at: Date
  order: any
  order_totals_details: OrderTotalDetails
}

function CustomerOrderReport() {
  let today = new Date().toISOString().slice(0, 10)
  const [ordersData, setOrdersData] = useState<Array<OrderData>>([])
  const [orderDate, setOrderDate] = useState<string>(today)

  const fetchReport = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('created_at', orderDate) // Correct
    if (data) {
      setOrdersData(data)
    }
  }

  const handleDate = (event : any) => {
    setOrderDate(event?.target.value)
  }

  useEffect(() => {
    fetchReport()
  }, [orderDate])

  useEffect(() => {
    fetchReport()
  }, [])

  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Report</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>
                <Input
                  placeholder='Select Date and Time'
                  size='md'
                  type='date'
                  onChange={handleDate}
                />
              </Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordersData.length > 0 &&
              ordersData.map((data: OrderData, i: number) => {
                console.log('data', data)
                return (
                  <Tr key={i}>
                    <Td>{data.order[0].created_at.toString()}</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                )
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomerOrderReport
