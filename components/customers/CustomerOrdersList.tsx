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
} from '@chakra-ui/react'

import { supabase } from '../../supabaseClient'
import CustomerModal from './CustomerModal'

interface CustomerList {
  id: number
  surname: string
  middle_name: string
  first_name: string
  osca_id: number
  birthday: Date
  contact_number: number
  address: string
  designated: string
  id_register_date: number
}
const CustomerOrdersList = ({
  reloadList,
  customerData,
  getCustomers,
  customerOrderData,
}: any) => {
  const [selectedProduct, setSelectedProduct] = useState<CustomerList[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data: []) => {
    if (data) {
      getCustomers()
    }
    setIsOpen(false)
  }

  const handleEditProduct = async (id: number) => {
    const { data, error } = await supabase
      .from('customers')
      .select()
      .eq('id', id)
    if (data) {
      setIsOpen(true)
      setSelectedProduct(data[0])
    }
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Name of Product</Th>
            <Th>Quantity</Th>
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
                  <Td>{items}</Td>
                  <Td>{quantity}</Td>
                  <Td>
                    {' '}
                    <Link color='teal.500' href='#'>
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
      <CustomerModal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        updateData={selectedProduct}
      />
    </TableContainer>
  )
}

export default CustomerOrdersList
