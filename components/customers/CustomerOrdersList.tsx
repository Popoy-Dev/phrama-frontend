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
  customerOrderData,
}: any) => {

  const handleOrdersDetail = (quantity : string[] , items : string[] )=> {
    
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
                    <Link color='teal.500' onClick={() => handleOrdersDetail(quantity, items)}>
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
    </TableContainer>
  )
}

export default CustomerOrdersList
