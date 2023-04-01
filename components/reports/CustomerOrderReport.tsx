import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import CustomerOrder from '../order/CustomerOrder'

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

const CustomerOrderReport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let today = new Date().toISOString().slice(0, 10)
  const [ordersData, setOrdersData] = useState<Array<OrderData>>([])
  const [orderDate, setOrderDate] = useState<string>(today)
  const [modalData, setModalData] = useState<any>(null)
  const fetchReport = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('created_at', orderDate) // Correct
    if (data) {
      setOrdersData(data)
    }
  }

  const handleDate = (event: any) => {
    setOrderDate(event?.target.value)
  }

  useEffect(() => {
    fetchReport()
  }, [orderDate])

  useEffect(() => {
    fetchReport()
  }, [])

  const handleViewOrder = (data: any) => {
    onOpen()
    setModalData(data.order.customerOrder)
  }
  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
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
            </Tr>
          </Thead>
          <Tbody>
            {ordersData.length > 0 ? (
              ordersData.map((data: OrderData, i: number) => {
                const date = new Date(data.order.order_at)

                const options: Intl.DateTimeFormatOptions = {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                  timeZone: 'Asia/Manila',
                  weekday: undefined,
                }
                return (
                  <Tr key={i}>
                    <Td>{data.order.order_at}</Td>
                    <Td>
                      <Button colorScheme='teal' onClick={() => handleViewOrder(data)}>
                        View
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            ) : (
              <Tr>
                    <Td>
                    <Center bg='red.400' h='100px' color='white'>
                No Data Found!
              </Center>
                    </Td>
                  </Tr>
         
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <CustomerOrder customerOrder={modalData} customerRetrive='retrive' /> 
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
            Ok
            </Button>
            <Button variant='ghost'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CustomerOrderReport
