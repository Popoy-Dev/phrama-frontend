import React, { useEffect, useState } from 'react'
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
const Order = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([])
  const [inventoryAllData, setInventoryAllData] = useState<Inventory[]>([])

  
  const [reloadList, setReloadList] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = async (e: any) => {
    const result = inventoryAllData.filter(data => {
      if(!e.target.value) {

        return   inventoryAllData
         
      }
      return data.product_name.toLocaleLowerCase().includes(e.target.value.toLowerCase())
    })

    setSearch(e.target.value)
    setInventoryData(result)

  }
  const getProducts = async () => {
    const { data, error }: any = await supabase.from('inventory').select().order('product_name', { ascending: true })
    setInventoryAllData(data)
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
          <Box p='4'>
            <Input placeholder='Search Product' onKeyUp={handleSearch} />
            <InventoryList reloadList={reloadList} inventoryData={inventoryData} getProducts={getProducts}/>

          </Box>
          <Spacer />
          <Box p='4'>
            <Input placeholder='Search Product' onKeyUp={handleSearch} />
            <InventoryList reloadList={reloadList} inventoryData={inventoryData} getProducts={getProducts}/>
          </Box>
        </Flex>
      </Card>
    </div>
  )
}

export default Order
