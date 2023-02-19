import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'

import { supabase } from '../../supabaseClient'

interface Inventory {
  id: number
  products: {name: string, category: string}
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date
}
const OrderList = ({
  inventoryData,
  handleAddOrder,
}: any) => {


  const handleAdd = (data: any) => {
    handleAddOrder(data)
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Type</Th>
            <Th>Manufacture Price</Th>
            <Th>Store Price</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryData &&
            inventoryData?.map((data: Inventory, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.products.name}</Td>
                  <Td>{data.products.category}</Td>
                  <Td>{`₱ ${data.manufacture_price}`}</Td>
                  <Td>{`₱ ${data.srp_price}`}</Td>
                  <Td>{data.quantity}</Td>
                  <Td>
                    <Button colorScheme='blue' onClick={() => handleAdd(data)}>
                      Add
                    </Button>
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
        {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
      </Table>
    </TableContainer>
  )
}

export default OrderList
