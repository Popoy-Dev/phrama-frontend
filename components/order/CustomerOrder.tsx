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
  is_vatable: boolean
}
const CustomerOrder = ({
  customerOrder,
  handleRemoveOrder,
  isRemoveItem,
}: any) => {
  const [removetotalQuantity, setRemoveTotalQuantity] = useState(0)
  const [removetotalDiscount, setRemoveTotalDiscount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const getTotal = () => {
    if (customerOrder.length === 0) {
      setRemoveTotalDiscount(0)
      setRemoveTotalQuantity(0)
    }
    setRemoveTotalQuantity(
      customerOrder.reduce(
        (acc: any, obj: any) => acc + parseInt(obj.order_quantity),
        0
      )
    )

    setRemoveTotalDiscount(
      customerOrder.reduce((acc: any, obj: any) => {
        const discounted = () => {
          if (obj.discounted) {
            return (
              acc + obj.srp_price * (20 / 100) * parseInt(obj?.order_quantity)
            )
          } else {
            return acc + 0
          }
        }

        return discounted()
      }, 0)
    )
    setTotalAmount(
      customerOrder.reduce((acc: any, obj: any) => {
        const total = () => {
          let vatValue = 0
          if (obj.is_vatable === true) {
            vatValue = 28 / 25
          } else {
            vatValue = 1
          }
          if (obj.discounted) {
            const vatComputation =
              (parseInt(obj?.order_quantity) * obj.srp_price) / vatValue
            const seniorDiscount = vatComputation * (20 / 100)
            return acc + vatComputation - seniorDiscount
          } else {
            return acc + parseInt(obj?.order_quantity) * obj.srp_price
          }
        }

        return total()
      }, 0)
    )
  }

  useEffect(() => {
    getTotal()
  }, [customerOrder, isRemoveItem])

  const handlePrintSave = async () => {
    const { error, data } = await supabase.from('orders').insert({
      order: customerOrder,
      order_totals_details: {
        removetotalQuantity,
       removetotalDiscount,
        totalAmount,
      },
    }).select()

    if(!error) {
      alert('Happy Customer!')
    }else {
      setErrorMessage("There something wrong!")
    }
  }

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
              let total = 0
              if (data.discounted && data.is_vatable === true) {
                let vatValue = 28 / 25
                const vatComputation =
                  (parseInt(data?.order_quantity) * data.srp_price) / vatValue
                const seniorDiscount = vatComputation * (20 / 100)
                total = vatComputation - seniorDiscount
              }
              if (!data.discounted && data.is_vatable) {
                total = parseInt(data?.order_quantity) * data.srp_price
              }
              if (data.discounted && data.is_vatable === false) {
                const vatComputation =
                  parseInt(data?.order_quantity) * data.srp_price
                const seniorDiscount = vatComputation * (20 / 100)
                total = vatComputation - seniorDiscount
              }
              if (!data.discounted && !data.is_vatable) {
                const vatComputation =
                  parseInt(data?.order_quantity) * data.srp_price
                total = parseInt(data?.order_quantity) * data.srp_price
              }

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
                  <Td>{total.toFixed(3)} </Td>
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
            <Th isNumeric>{totalAmount.toFixed(3)}PHP</Th>
            <Th>
              {' '}
              <Button
                colorScheme='whatsapp'
                variant='solid'
                onClick={handlePrintSave}
              >
                Print Order
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrder
