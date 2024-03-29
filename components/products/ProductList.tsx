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
import ProductModal from './ProductModal'

interface Product {
  id: number
  name: string
  indication: string
  category: string
  code: string
  precaution: number
  generic_name: string
  description: string
}
const ProductList = ({ productData, getProducts, loading }: any) => {
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [page, setPage] = useState(0)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data: []) => {
    if (data) {
      getProducts()
    }
    setIsOpen(false)
  }

  const handleEditProduct = async (id: number) => {
    const { data, error } = await supabase
      .from('products')
      .select()
      .eq('id', id)
    if (data) {
      setIsOpen(true)
      setSelectedProduct(data[0])
    }
  }
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const isMoreData = (page + 1) * 10 < productData.length

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
            <Th>Generic Name</Th>
            <Th>Description</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productData &&
            productData
              ?.slice(0, (page + 1) * 10 )
              .map((data: Product, i: number) => {
                return (
                  <Tr key={i}>
                    <Td>{data.name}</Td>
                    <Td>{data.indication}</Td>
                    <Td>{data.category}</Td>
                    <Td>{data.code}</Td>
                    <Td>{data.precaution}</Td>
                    <Td>{data.generic_name}</Td>
                    <Td>{data.description}</Td>
                    <Td>
                      <Button
                        colorScheme='yellow'
                        onClick={() => handleEditProduct(data.id)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              {' '}
              {!loading && isMoreData && (
                <Button variant='outline' onClick={handleLoadMore}>
                  Load More
                </Button>
              )}
            </Th>
          </Tr>
        </Tfoot>
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
