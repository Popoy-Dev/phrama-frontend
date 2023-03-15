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
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

const CustomerOrdersList = ({ customerOrderData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [orderItems, setOrderItems] = useState([])

  const OrderModal = () => (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer order details</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <TableContainer m='2'>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>Fayne Pharmacy 2023</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderItems.map((data: any, i: number) => {
                  return (
                    <>
                      <Tr key={i}>
                        <Td>{data.products.name}</Td>
                        <Td>{data.order_quantity}</Td>
                      </Tr>
                    </>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
  const handleOrderDetail = (data: any) => {
    onOpen()
    setOrderItems(data)
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customerOrderData &&
            customerOrderData?.map((data: any, i: number) => {
              let items: string[] = []
              let quantity: string[] = []
              const date = new Date(data.created_at)
              const options: Intl.DateTimeFormatOptions = {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }
              const formattedDate = date.toLocaleString('en-US', options)
              data.order?.forEach((order: any) => {
                items.push(order.products.name + ',')
                quantity.push(order.order_quantity + ',')
              })
              const birthday = new Date(data.birthday)
              const ageInMilliseconds = Date.now() - birthday.getTime()
       
              return (
                <Tr key={i}>
                  <Td>
                    {' '}
                    <Link
                      color='teal.500'
                      onClick={() => handleOrderDetail(data.order)}
                    >
                      {formattedDate}
                    </Link>{' '}
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
      <OrderModal />
    </TableContainer>
  )
}

export default CustomerOrdersList
