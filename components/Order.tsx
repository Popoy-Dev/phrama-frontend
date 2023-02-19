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

import { supabase } from '../supabaseClient'
import OrderList from './order/OrderList'

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
  const [addData, setAddData] = useState<any>([])

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
  const getInventory = async () => {
    const { data, error }: any = await supabase.from('inventory').select(     `
    *,
    products (
      name,
      category
    )
  `
     ).order('product_id', { ascending: true })
    setInventoryAllData(data)
    setInventoryData(data)
  }

  useEffect(() => {
    
    if(reloadList) {
      getInventory()
    }
  }, [reloadList])

  useEffect(() => {
    getInventory()
  }, [])

  const handleAddOrder = (data: object) => {
  setAddData((oldArray: []) => [...oldArray, data])

  }
  return (
    <div>
      <Card>
        <Flex>
          <Box p='4'>
            <Input placeholder='Search Product' onKeyUp={handleSearch} />
            <OrderList reloadList={reloadList} inventoryData={inventoryData} getInventory={getInventory}  handleAddOrder={handleAddOrder}/>
          </Box>
          <Spacer />
          <Box p='4'>
            <Input placeholder='Search Product' onKeyUp={handleSearch} />
            <OrderList reloadList={reloadList} inventoryData={inventoryData} getInventory={getInventory} handleAddOrder={handleAddOrder}/>
          </Box>
        </Flex>
      </Card>
    </div>
  )
}

export default Order
