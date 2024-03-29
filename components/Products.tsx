import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
  Input,
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

function Products() {
  const [productData, setProductData] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const [loading, setLoading] = useState(false);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [searchData, setSearchData] = useState<Product[]>([])


  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data:[])  => {
    if(data) {
      setReloadList(!reloadList)
    }
    setIsOpen(false)
  }
  const getProducts = async () => {
    setLoading(true)
    const { data, error }: any = await supabase.from('products').select().order('name', { ascending: true })
    setProductData(data)
    setSearchData(data)
    setLoading(false)

  }
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    
      getProducts()
  }, [reloadList])

  const handleSearch = async (e: any) => {
    const result = productData.filter((data) => {
      if (!e.target.value) {
        return productData
      }
      return data.name
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
            <Heading size='md'>Products</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='teal' size='md' onClick={onOpen}>
              Create Product
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
        <Input
            placeholder='Search Product'
            onKeyUp={handleSearch}
            size='lg'
          />
          <ProductList reloadList={reloadList} productData={searchData} getProducts={getProducts}  loading={loading}/>
        </Box>
      </Card>
    </div>
  )
}

export default Products
