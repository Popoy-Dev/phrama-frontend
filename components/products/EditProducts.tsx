import React, {useEffect, useState} from 'react'
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
  } from '@chakra-ui/react'

  import { supabase } from '../../supabaseClient'

  interface Product {
  name: string,
  indication: string,
  category: string,
  code: string,
  srp_price: number,

  
  }
const EditProducts = () => {

  const [productData, setProductData] = useState<Product[]>([])

  const getProducts = async () => {
    const { data, error }: any = await supabase
  .from('products')
  .select()
  setProductData(data)
  }

  useEffect(() => {
    getProducts()
  }, [])
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
        <Th>Price</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {productData && productData?.map((data: Product, i: number) => {
      
        return (
            <Tr key={i}>
        <Td>{data.name}</Td>
        <Td>{data.indication}</Td>
        <Td>{data.category}</Td>
        <Td>{data.code}</Td>
        <Td>{data.srp_price}</Td>
        {/* <Td isNumeric>25.4</Td> */}
      </Tr> 
          )
    })
      
     }
     
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>
</TableContainer>
    )
}

export default EditProducts