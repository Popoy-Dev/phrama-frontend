import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
  SimpleGrid,
  Input,
} from '@chakra-ui/react'

import { supabase } from '../supabaseClient'
import CustomerModal from './customers/CustomerModal'
import CustomerList from './customers/CustomerList'
import CustomerOrdersList from './customers/CustomerOrdersList'
interface Product {
  id: number
  first_name: string
  indication: string
  category: string
  code: string
  precaution: number
}

function Users() {
  const [customerData, setCustomerData] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const [customerOrderData, setCustomerOrderData] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<Product[]>([])

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data: []) => {
    if (data) {
      setReloadList(true)
    }
    setIsOpen(false)
  }
  const getCustomers = async () => {
    setLoading(true)
    const { data, error }: any = await supabase
      .from('customers')
      .select()
      .order('id', { ascending: true })
    setCustomerData(data)
    setSearchData(data)
    setLoading(false)
  }

  const setCustomerTransaction = (data: any) => {
    setCustomerOrderData(data)
  }
  useEffect(() => {
    getCustomers()
  }, [])
  useEffect(() => {
    if (reloadList) {
      getCustomers()
    }
  }, [reloadList])
  console.log('customerData', customerData)
    const handleSearch = async (e: any) => {
    const result = customerData.filter((data) => {
      if (!e.target.value) {
        return customerData
      }
      return data.surname
        .toLocaleLowerCase()
        .includes(e.target.value.toLowerCase())
    })

    setSearchData(result)
  }
  return (
    <div>
      <Card>
        <Flex>
          <CardHeader className='flex justify-between'>
            <Heading size='md'>Customers</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='teal' size='md' onClick={onOpen}>
              Create User
            </Button>
            <CustomerModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
          
        </Flex>
        <Box p='4'>
        <Input
            placeholder='Search Product'
            onKeyUp={handleSearch}
            size='lg'
          />
          <SimpleGrid columns={2} spacing={10}>

            <CustomerList
              reloadList={reloadList}
              customerData={searchData}
              getCustomers={getCustomers}
              setCustomerTransaction={setCustomerTransaction}
              loading={loading}
            />
            <CustomerOrdersList customerOrderData={customerOrderData}  />
          </SimpleGrid>
        </Box>
      </Card>
    </div>
  )
}

export default Users
