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

import { supabase } from '../../../supabaseClient'
import ProductModal from './ProductModal'
import { isAllOf } from '@reduxjs/toolkit'

interface Product {
  id: number
  name: string
  indication: string
  category: string
  code: string
  precaution: number
}
const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([])
  const [productData, setProductData] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data:[])  => {
    if(data) {
      getProducts()
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
  const handleEditProduct = async (id: number) => {
    const {data, error } = await supabase
  .from('products')
  .select()
  .eq('id', id)

  if(data) {
    setIsOpen(true)
    setSelectedProduct(data)
  }
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Indication</Th>
            <Th>Category</Th>
            <Th>Code</Th>
            <Th>Pre-Caution</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productData &&
            productData?.map((data: Product, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.name}</Td>
                  <Td>{data.indication}</Td>
                  <Td>{data.category}</Td>
                  <Td>{data.code}</Td>
                  <Td>{data.precaution}</Td>
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
      <ProductModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              updateData={selectedProduct}
            />
    </TableContainer>
  )
}

export default ProductList
