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

import InventoryModal from './invetory/InventoryModal'
import InventoryList from './invetory/InventoryList'
import { supabase } from '../supabaseClient'

interface Inventory {
  id: number
  product_name: string
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date
}

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([])
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
    const { data, error }: any = await supabase.from('inventory').select().order('product_name', { ascending: true })
    setInventoryData(data)
  }

  useEffect(() => {
    
    if(reloadList) {
      getProducts()
    }
  }, [reloadList])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <Card>
        <Flex>
          <CardHeader className='flex justify-between'>
            <Heading size='md'>Inventory</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='gray' size='md' onClick={onOpen}>
              Create Inventory
            </Button>
            <InventoryModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        </Flex>
        <Box p='4'>
        <InventoryList reloadList={reloadList} inventoryData={inventoryData} getProducts={getProducts}/>
        </Box>
      </Card>
    </div>
  )
}

export default Inventory
