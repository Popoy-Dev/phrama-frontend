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
import CustomerOrder from './order/CustomerOrder'

interface Inventory {
  id: number
  products: {name: string}
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
  const [isRemoveItem, setIsremoveItem] = useState(false)
  const [search, setSearch] = useState('')
  const [customerOrder, setCustomerOrder] = useState<any>([])
  const [reloadInventory, setReloadInventory] = useState(false)
  const handleSearch = async (e: any) => {
    const result = inventoryAllData.filter((data) => {
      if (!e.target.value) {
        return inventoryAllData
      }
      return data.products.name.toLocaleLowerCase().includes(e.target.value.toLowerCase())
    })

    setSearch(e.target.value)
    setInventoryData(result)
  }
  const getInventory = async () => {
    const { data, error }: any = await supabase
      .from('inventory')
      .select(
        `
    *,
    products (
      name,
      category,
      generic_name
    )
  `
      )
      .order('product_id', { ascending: true })
    setInventoryAllData(data)
    setInventoryData(data)
  }

  useEffect(() => {
    if (reloadList) {
      getInventory()
    }
  }, [reloadList])

  useEffect(() => {
    getInventory()
  }, [])

  const handleAddOrder = (data: object) => {
    setCustomerOrder((oldArray: []) => [...oldArray, data])
  }

  const handleRemoveOrder = (product_order: number) => {
    setCustomerOrder(customerOrder.filter((item: any) => item.product_order !== product_order))
    setIsremoveItem(true)
 }

  const handleRemoveAllOrder = (info: boolean) => {
    if(info) {
      setCustomerOrder([])
    }
  
  }
  const handleReloadInventory = (value: boolean) => {
    setReloadInventory(value)
  }
  useEffect(() => {
    getInventory()
  }, [reloadInventory])
  return (
    <div>
        <Card m='4'>
          <Box p='8'>
            <Input placeholder='Search Product' onKeyUp={handleSearch}  size='lg'/>
            <OrderList
              reloadList={reloadList}
              inventoryData={inventoryData}
              getInventory={getInventory}
              handleAddOrder={handleAddOrder}
            />
          </Box>
        </Card>
        <Spacer />
        
      <Card m='4' mt='12'>
          <Box m='2'>
            <CustomerOrder handleReloadInventory={handleReloadInventory} customerOrder={customerOrder} handleRemoveOrder={handleRemoveOrder} isRemoveItem={isRemoveItem} handleRemoveAllOrder={handleRemoveAllOrder} />
          </Box>
        </Card>
    </div>
  )
}

export default Order
