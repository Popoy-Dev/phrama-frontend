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
const CustomerList = ({reloadList, customerData, getCustomers}: any) => {
  const [selectedProduct, setSelectedProduct] = useState<CustomerList[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data:[])  => {
    if(data) {
        getCustomers()
    }
    setIsOpen(false)
  }

  const handleEditProduct = async (id: number) => {
    const {data, error } = await supabase
  .from('customers')
  .select()
  .eq('id', id)
  if(data) {
    setIsOpen(true)
    setSelectedProduct(data[0])
  }
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Surname</Th>
            <Th>Middle Name</Th>
            <Th>First Name</Th>
            <Th>OSCA ID</Th>
            <Th>Birthday</Th>
            <Th>Age</Th>
            <Th>Contact Number</Th>
            <Th>Address</Th>
            <Th>Designated</Th>
            <Th>ID Register date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customerData &&
            customerData?.map((data: CustomerList, i: number) => {
              const birthday = new Date(data.birthday);
              const ageInMilliseconds = Date.now() - birthday.getTime();
              const oscaRegisteredDate = new Date(data.id_register_date)
              const ageInYears = Math.floor(ageInMilliseconds / 31557600000); 
              return (
                <Tr key={i}>
                  <Td>{data.surname}</Td>
                  <Td>{data.middle_name }</Td>
                  <Td>{data.first_name }</Td>
                  <Td>{data.osca_id}</Td>
                  <Td>{birthday.toDateString()}</Td>
                  <Td>{ageInYears}</Td>
                  <Td>{data.contact_number}</Td>
                  <Td>{data.address}</Td>
                  <Td>{data.designated}</Td>
                  <Td>{oscaRegisteredDate.toDateString()}</Td>
                  <Td>
                    <Button colorScheme='yellow' onClick={() =>handleEditProduct(data.id)}>Edit</Button>
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

export default CustomerList
