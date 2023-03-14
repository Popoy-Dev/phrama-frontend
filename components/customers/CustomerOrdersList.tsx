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

const CustomerOrdersList = ({
  customerOrderData,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
const [orderItems, setOrderItems] = useState([])
const [orderQuantity, setOrderQuantity] = useState<string[]>()
  const OrderModal = () =>    (
    <>
  <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Customer order details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    </ModalBody>
 <p>{orderItems}</p>
 <p>{orderQuantity}</p>
    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  </>
    )
    const handleOrderDetail = (items: any, quantity: string[]) => {
      onOpen()
      setOrderItems(items)
      setOrderQuantity(quantity)
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
              const date = new Date('2023-03-13T03:40:34.778167+00:00')
              const options: Intl.DateTimeFormatOptions = {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }
              const formattedDate = date.toLocaleString('en-US', options)
              console.log(formattedDate) // Output: March 13, 2023, 03:40 AM
              data.order?.forEach((order: any) => {
                items.push(order.products.name + ',')
                quantity.push(order.order_quantity + ',')
              })
              const birthday = new Date(data.birthday)
              const ageInMilliseconds = Date.now() - birthday.getTime()
              const oscaRegisteredDate = new Date(data.id_register_date)
              const ageInYears = Math.floor(ageInMilliseconds / 31557600000)
              return (
                <Tr key={i}>
                                    {/* <Td>{items}</Td>
                  <Td>{quantity}</Td> */}
                  <Td>
                    {' '}
        
                                       <Link color='teal.500' onClick={() => handleOrderDetail(items, quantity) }>
                      {formattedDate}
                    </Link>{' '}
                  </Td>

                  {/* <Td>{birthday.toDateString()}</Td>
                  <Td>{data.contact_number}</Td>
                  <Td>{data.address}</Td>
                  <Td>{data.designated}</Td>
                  <Td>{oscaRegisteredDate.toDateString()}</Td> */}
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
