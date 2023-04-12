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
  Spinner,
  AbsoluteCenter,
  Box,
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
const CustomerList = ({
  loading,
  customerData,
  getCustomers,
  setCustomerTransaction,
}: any) => {
  const [selectedProduct, setSelectedProduct] = useState<CustomerList[]>([])
  const [buttonDisabledId, setButtonDisabledId] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(0);

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

  const handleCustomerTransac = async (id: number) => {
    const { data, error } = await supabase
      .from('orders')
      .select()
      .eq('customer_id', id)
    setCustomerTransaction(data)
    setButtonDisabledId(id)
  }
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }
  const isMoreData = (page + 1) * 2 < customerData.length;
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>Surname</Th>
            <Th>Middle Name</Th>
            <Th>First Name</Th>
            <Th>OSCA ID</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customerData.length !== 0 ? (
             customerData?.slice(0, (page + 1) * 2).map((data: CustomerList, i: number) => {
              const birthday = new Date(data.birthday)
              const ageInMilliseconds = Date.now() - birthday.getTime()
              const oscaRegisteredDate = new Date(data.id_register_date)
              const ageInYears = Math.floor(ageInMilliseconds / 31557600000)
              return (
                <Tr key={i}>
                  <Td>{data.surname}</Td>
                  <Td>{data.middle_name}</Td>
                  <Td>{data.first_name}</Td>
                  <Td>{data.osca_id}</Td>
                  <Td>{ageInYears}</Td>
                  <Td>
                    <Button
                      colorScheme='yellow'
                      display='inline'
                      mr={2}
                      onClick={() => handleEditProduct(data.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme='blue'
                      isDisabled={buttonDisabledId === data.id}
                      display='inline'
                      onClick={() => handleCustomerTransac(data.id)}
                    >
                      View Transcations
                    </Button>
                  </Td>
                </Tr>
              )
            })
          ) : (
            <Box>
              <AbsoluteCenter>
                <Spinner
                  className='items-center'
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </AbsoluteCenter>
            </Box>
          )}
        </Tbody>
        {!loading && isMoreData && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
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
