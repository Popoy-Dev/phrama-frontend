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
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { supabase } from '../../supabaseClient'

interface Inventory {
  id: number
  products: { name: string; category: string }
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date
  order_quantity: string
  discounted: string
  product_order: number
}
const CustomerOrder = ({
  customerOrder,
  handleRemoveOrder,
  isRemoveItem,
}: any) => {
  const [removetotalQuantity, setRemoveTotalQuantity] = useState(0)
  const [removetotalDiscount, setRemoveTotalDiscount] = useState(0)

  const getTotal = () => {
    if(customerOrder.length === 0) {
      setRemoveTotalDiscount(0)
      setRemoveTotalQuantity(0)
    }
    setRemoveTotalQuantity(
      customerOrder.reduce(
        (acc: any, obj: any) => acc + parseInt(obj.order_quantity),
        0
      )
    )

      customerOrder.map((data: any) => {
          if(data.discounted) {
            setRemoveTotalDiscount(
              customerOrder.reduce(
                (acc: any, obj: any) => acc + (data.srp_price * (20 / 100) *parseInt(data?.order_quantity)),
                0
              )
            )
          }
      })
  }

  useEffect(() => {
    getTotal()
  }, [customerOrder, isRemoveItem])
  
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='purple'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Type</Th>
            <Th>Store Price</Th>
            <Th>Quantity</Th>
            <Th>Discount</Th>
            <Th>Total</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customerOrder &&
            customerOrder?.map((data: Inventory, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.products.name}</Td>
                  <Td>{data.products.category}</Td>
                  <Td>{`₱ ${data.srp_price}`}</Td>

                  <Td>{data.order_quantity} pcs</Td>
                  <Td>
                    {data.discounted
                      ? (
                          data.srp_price *
                          (20 / 100) *
                          parseInt(data?.order_quantity)
                        ).toFixed(2)
                      : 'No Discount'}{' '}
                  </Td>
                  <Td>
                    {data.discounted
                      ? (parseInt(data?.order_quantity) * data.srp_price) - ((data.srp_price *(20 / 100)) * parseInt(data?.order_quantity))
                      : (
                          parseInt(data?.order_quantity) * data.srp_price
                        ).toFixed(2)}{' '}
                  </Td>
                  <Td>
                    {' '}
                    <Button
                      colorScheme='red'
                      variant='outline'
                      onClick={() => handleRemoveOrder(data.product_order)}
                    >
                      Remove
                    </Button>{' '}
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
        <Tfoot className='text-right'>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th>Total quantity - {removetotalQuantity} pieces</Th>
            <Th>Total Discount - {removetotalDiscount.toFixed(2)}PHP</Th>
            <Th isNumeric>Total Amount</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrder
