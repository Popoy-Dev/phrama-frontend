import {
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
  order: CustomerOrder
  order_totals_details: OrderTotalDetails
}

function CustomerOrderReport() {
  const [ordersData, setOrdersData] = useState<Array<OrderData>>([])

  const fetchReport = async () => {
    let today = new Date().toISOString().slice(0, 10)
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('created_at', today) // Correct
    if (data) {
      setOrdersData(data)
    }
  }

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
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordersData.length > 0 &&
              ordersData.map((data: OrderData, i: number) => {
                return (
                  <Tr key={i}>
                    <Td>{data.created_at.toString()}</Td>
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
