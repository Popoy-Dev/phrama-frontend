// @ts-ignore
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
  Alert,
  AlertIcon,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from '@chakra-ui/react'
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from 'react-thermal-printer'

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
  handleRemoveAllOrder,
  handleReloadInventory,
  customerRetrive,
}: any) => {
  console.log('customerOrder', customerOrder)
  const dateToday = new Date()
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  const formattedDate = dateToday.toLocaleString('en-US', options)
  const [removetotalQuantity, setRemoveTotalQuantity] = useState(0)
  const [removetotalDiscount, setRemoveTotalDiscount] = useState(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [customerList, setCustomerList] = useState<Array<any>>([])
  const [customerId, setCustomerId] = useState<number | null>(null)
  const [customerMoney, setCustomerMoney] = useState<number>(0)
  console.log('customerMoney', customerMoney)
  const [port, setPort] = useState()
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

  const getCustomersList = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select()
      .order('surname', { ascending: true })
    if (data) {
      setCustomerList(data)
    }
  }
  useEffect(() => {
    getCustomersList()
  }, [])

  useEffect(() => {
    getTotal()
  }, [customerOrder, isRemoveItem])
  const handlePrintSave = async () => {
    const { error, data } = await supabase
      .from('orders')
      .insert({
        order: { customerOrder, order_at: formattedDate },
        order_totals_details: {
          removetotalQuantity,
          removetotalDiscount,
          totalAmount,
        },
        customer_id: customerId,
        created_at: formattedDate,
      })
      .select()

    if (!error) {
      const idMap: any = {}
      for (let index = 0; index < customerOrder.length; index++) {
        const item = customerOrder[index]
        if (idMap[item.id]) {
          idMap[item.id].order_quantity += item.order_quantity
        } else {
          idMap[item.id] = {
            id: item.id,
            order_quantity: item.order_quantity,
            ordered_quantity: item.ordered_quantity,
          }
        }
      }
      const resultArr = Object.values(idMap)
      resultArr.map(async (order: any) => {
        const updatedOrder = order.ordered_quantity + order.order_quantity
        const { data, error } = await supabase
          .from('inventory')
          .update({ ordered_quantity: updatedOrder })
          .eq('id', order.id)
      })

      if (!error) {
        setSuccessMessage(true)
        if (customerRetrive !== 'retrive') {
          handleReloadInventory(true)
          handleRemoveAllOrder(true)
        }

        try {
          let _port: any = port

          if (_port == null) {
            // Request permission to access the serial port
            _port = await (navigator as any).serial.requestPort()
            await _port.open({ baudRate: 9600 })
            setPort(_port)
          }

          const receipt = (
            <Printer type='epson' width={30} characterSet='korea' debug={true}>
              <Text bold={true} align='center'>
                Fayne Pharmacy
              </Text>
              <Text align='center'>
                006 San Miguel Phase 3 Fortune Marikina City
              </Text>
              <Text align='center'>
                Email: faynepharmacy@gmail.com/09954508380
              </Text>
              <Text align='center'>VAT Registration: ------</Text>
              <Br />
              <Text bold={true}>Cashier Name: Joyce Kua</Text>
              <Text bold={true}>{`${formattedDate}`}</Text>
              <Br />
              <Line />
              {customerOrder.map((item: any, i: number) => {
                let total = 0
                if (item.discounted && item.is_vatable === true) {
                  let vatValue = 28 / 25
                  const vatComputation =
                    (parseInt(item?.order_quantity) * item.srp_price) / vatValue
                  const seniorDiscount = vatComputation * (20 / 100)
                  total = vatComputation - seniorDiscount
                }
                if (!item.discounted && item.is_vatable) {
                  total = parseInt(item?.order_quantity) * item.srp_price
                }
                if (item.discounted && item.is_vatable === false) {
                  const vatComputation =
                    parseInt(item?.order_quantity) * item.srp_price
                  const seniorDiscount = vatComputation * (20 / 100)
                  total = vatComputation - seniorDiscount
                }
                if (!item.discounted && !item.is_vatable) {
                  parseInt(item?.order_quantity) * item.srp_price
                  total = parseInt(item?.order_quantity) * item.srp_price
                }

                return (
                  <div key={i}>
                    <Row
                      left={`${item?.products?.name}`}
                      right={`PHP${total.toFixed(2)}`}
                    />
                    <Text>{`${
                      item?.order_quantity
                    } x PHP${item?.srp_price.toFixed(2)}`}</Text>
                  </div>
                )
              })}

              <Line />
              <Row
                left={<Text bold={true}>AMOUNT DUE:</Text>}
                right={<Text bold={true}>{`${totalAmount.toFixed(2)}`}</Text>}
              />
              <Br />
              <Text align='center'>
                For order online or reservation: 09954508380
              </Text>
              <Text align='center'>Thank you, please come again</Text>
              <Text align='center'>Acknowledge Receipt</Text>
              <Text align='center'>Jeremiah 29:11</Text>
              <Cut />
            </Printer>
          )

          const writer = _port.writable?.getWriter()
          if (writer != null) {
            const data = await render(receipt)

            await writer.write(data)
            writer.releaseLock()
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        alert('SOmething wrong in edit')
      }
    } else {
      setErrorMessage('There something wrong!')
    }
  }

  const handleCustomer = (event: any) => {
    const customerID = event.target.value
    setCustomerId(customerID)
  }
  return (
    <TableContainer>
      {successMessage ? (
        <Alert status='success'>
          <AlertIcon />
          Customer order saved!
        </Alert>
      ) : (
        ''
      )}

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
                  <Td>{total.toFixed(2)} </Td>
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
    
            <Th>Total quantity - {removetotalQuantity} pieces</Th>
            <Th>Total Discount - {removetotalDiscount.toFixed(2)}PHP</Th>
            <Th isNumeric>{totalAmount.toFixed(2)}PHP</Th>
            <Th>
              {' '}
              {customerOrder.length !== 0 ? (
                <>
                <Stack shouldWrapChildren direction='row'>
                <NumberInput min={1} size='md' display='inline' onChange={(value) => setCustomerMoney(parseInt(value))}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Button
                    display='inline'
                    colorScheme='whatsapp'
                    variant='solid'
                    onClick={handlePrintSave}
                    isDisabled={parseInt(totalAmount.toFixed(2)) > customerMoney ? true : false}
                  >
                    Print Order
                  </Button>{' '}
                  <Select
                    display='inline'
                    placeholder='Select Customer'
                    width='full'
                    onChange={handleCustomer}
                  >
                    {customerList.map((customer: any, i: number) => (
                      <option
                        value={customer.id}
                        key={i}
                      >{`${customer.surname}.  ${customer.first_name} ${customer.middle_name},`}</option>
                    ))}
                  </Select>

                </Stack>
               
                </>
              ) : (
                ''
              )}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrder
