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
} from '@chakra-ui/react'

import { supabase } from '../supabaseClient'
import CustomerModal from './customers/CustomerModal'
import CustomerList from './customers/CustomerList'
interface Product {
  id: number
  name: string
  indication: string
  category: string
  code: string
  precaution: number
}

function Users() {
  const [customerData, setCustomerData] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [reloadList, setReloadList] = useState(false)
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
    const { data, error }: any = await supabase
      .from('customers')
      .select()
      .order('id', { ascending: true })
    setCustomerData(data)
  }
  useEffect(() => {
    getCustomers()
  }, [])
  useEffect(() => {
    if (reloadList) {
      getCustomers()
    }
  }, [reloadList])
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
          <SimpleGrid columns={2} spacing={10}>
            <CustomerList
              reloadList={reloadList}
              customerData={customerData}
              getCustomers={getCustomers}
            />
            <CustomerList
              reloadList={reloadList}
              customerData={customerData}
              getCustomers={getCustomers}
            />
          </SimpleGrid>
        </Box>
      </Card>
    </div>
  )
}

export default Users
