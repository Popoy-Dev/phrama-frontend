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
  Badge,
  Text,
  Flex,
  Spacer,
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
  is_vatable: boolean
  expiry_date: Date
  ordered_quantity: number
}
const InventoryList = ({ reloadList, inventoryData, getInventory }: any) => {
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data: []) => {
    if (data) {
      getInventory()
    }
    setIsOpen(false)
  }

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  function paginate(array: [], page_size: any, page_number: any) {
    return array.slice((page_number - 1) * page_size, page_number * page_size)
  }
  const paginatedData = paginate(inventoryData, 2, currentPage)

  const handleEditInventory = async (id: number) => {
    const { data, error } = await supabase
      .from('inventory')
      .select()
      .eq('id', id)
    if (data) {
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
            <Th>SOH</Th>
            <Th>Is Vatable</Th>
            <Th>Expiry Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryData &&
            paginatedData?.map((data: Inventory, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.product_name}</Td>
                  <Td>{data.batch_number}</Td>
                  <Td>{`₱ ${data.manufacture_price.toFixed(2)}`}</Td>
                  <Td>{`₱ ${data.srp_price.toFixed(2)}`}</Td>
                  <Td>{data.quantity} pieces</Td>
                  <Td>
                    {data.quantity - data.ordered_quantity === 0 ? (
                      <Text as='mark'>
                        {data.quantity - data.ordered_quantity} pieces
                      </Text>
                    ) : (
                      <Text>
                        {data.quantity - data.ordered_quantity} pieces
                      </Text>
                    )}{' '}
                  </Td>
                  <Td>
                    {data.is_vatable ? (
                      <Badge colorScheme='green'>With VAT</Badge>
                    ) : (
                      <Badge colorScheme='red'>Non VAT</Badge>
                    )}
                  </Td>
                  <Td>{new Date(`${data.expiry_date}`).toUTCString()}</Td>
                  <Td>
                    <Button
                      colorScheme='yellow'
                      onClick={() => handleEditInventory(data.id)}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
        <div>
          <Flex>
            <Button
              colorScheme='gray'
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
            <Spacer />
            <Button
              disabled={currentPage === Math.ceil(inventoryData.length / 2)}
              onClick={handleNextPage}
              colorScheme='green'
            >
              Next
            </Button>
          </Flex>
        </div>
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
