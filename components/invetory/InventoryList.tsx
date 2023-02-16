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
import InventoryModal from './InventoryModal'

interface Inventory {
  id: number
  product_name: string
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date
}
const InventoryList = ({reloadList, inventoryData, getProducts}: any) => {
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([])
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



  const handleEditInventory = async (id: number) => {
    const {data, error } = await supabase
  .from('inventory')
  .select()
  .eq('id', id)
  if(data) {
    setIsOpen(true)
    setSelectedInventory(data[0])
  }

  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Batch Number</Th>
            <Th>Manufacture Price</Th>
            <Th>Store Price</Th>
            <Th>Quantity</Th>
            <Th>Expiry Date</Th>
  
          </Tr>
        </Thead>
        <Tbody>
          {inventoryData &&
            inventoryData?.map((data: Inventory, i: number) => {
              
              return (
                <Tr key={i}>
                  <Td>{data.product_name}</Td>
                  <Td>{data.batch_number}</Td>
                  <Td>{`₱ ${data.manufacture_price}`}</Td>
                  <Td>{`₱ ${data.srp_price}`}</Td>
                  <Td>{data.quantity}</Td>
                  <Td>{data.expiry_date.toString()}</Td>
                  <Td>
                    <Button colorScheme='yellow' onClick={() =>handleEditInventory(data.id)}>Edit</Button>
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
      <InventoryModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              updateData={selectedInventory}
            />
    </TableContainer>
  )
}

export default InventoryList
