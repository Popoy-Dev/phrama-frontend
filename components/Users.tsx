import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'

import ProductList from './products/ProductList'
import ProductModal from './products/ProductModal'
import { supabase } from '../supabaseClient'
interface Product {
  id: number
  name: string
  indication: string
  category: string
  code: string
  precaution: number
}

function Users() {
  const [productData, setProductData] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data:[])  => {
    if(data) {
      setReloadList(true)
    }
    setIsOpen(false)
  }
  const getProducts = async () => {
    const { data, error }: any = await supabase.from('products').select().order('name', { ascending: true })
    setProductData(data)
  }
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    
    if(reloadList) {
      getProducts()
    }
  }, [reloadList])
  return (
    <div>
      <Card>
        <Flex>
          <CardHeader className='flex justify-between'>
            <Heading size='md'>Products</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='teal' size='md' onClick={onOpen}>
              Create User
            </Button>
            <ProductModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        </Flex>
        <Box p='4'>
          <ProductList reloadList={reloadList} productData={productData} getProducts={getProducts} />
        </Box>
      </Card>
    </div>
  )
}

export default Users
