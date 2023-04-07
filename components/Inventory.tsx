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
  const [searchData, setSearchData] = useState<Inventory[]>([])
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
  const getInventory = async () => {
    const { data, error }: any = await supabase
      .from('inventory')
      .select(
        `
    *,
    products (
      name
    )
  `
      )
      .order('product_id', { ascending: true })
      const newData: any = data.map((d: any) =>  {
        return (
          {
            id: d?.id,
            product_name:  d?.products?.name,
            batch_number: d?.batch_number,
            srp_price: d?.srp_price,
            manufacture_price: d?.manufacture_price,
            quantity: d?.quantity,
            expiry_date: d?.expiry_date,
            is_vatable: d?.is_vatable,
            ordered_quantity: d?.ordered_quantity 
          }
          )
      })
   
    setInventoryData(newData)
    setSearchData(newData)
  }

  useEffect(() => {
    if (reloadList) {
      getInventory()
    }
  }, [reloadList])

  useEffect(() => {
    getInventory()
  }, [])

  const handleSearch = async (e: any) => {
    console.log('productData', searchData)
    const result = searchData.filter((data) => {
      if (!e.target.value) {
        return searchData
      }
      return data.product_name
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
        <Input
            placeholder='Search Product'
            onKeyUp={handleSearch}
            size='lg'
          />
          <InventoryList
            reloadList={reloadList}
            inventoryData={searchData}
            getInventory={getInventory}
          />
        </Box>
      </Card>
    </div>
  )
}

export default Inventory
