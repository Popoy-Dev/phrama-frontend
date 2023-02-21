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
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react'

import { supabase } from '../../supabaseClient'

interface Inventory {
  id: number
  products: { name: string; category: string, generic_name: string }
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date,
  vat: boolean
}
const OrderList = ({ inventoryData, handleAddOrder }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [errorIndex, setErrorIndex] = useState(0)
  const handleAdd = (data: any, id: any, order_quantity: number, i : number) => {
    if(!order_quantity ||order_quantity <= 0) {
      setErrorIndex(i)
      setErrorMessage('Please input quantity')
    }else {
      const newData = {
        ...data,
        discounted: id,
        order_quantity: order_quantity,
        product_order: Math.floor(Math.random() * 100)
      }
      handleAddOrder(newData)
    }
    
  }
  const [checkedItems, setCheckedItems] = useState<any>([])
  function handleCheck(item: any) {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i: any) => i !== item))
    } else {
      setCheckedItems([...checkedItems, item])
    }
  }
  const [inputValues, setInputValues] = useState([]);
  const handleInputChange = (event: any, index: any) => {

    setInputValues(prevInputValues => {
      const updatedInputValues: any = [...prevInputValues];
      updatedInputValues[index] = event;
      return updatedInputValues;
    });
  }

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Type</Th>
            <Th>Generic name</Th>
            <Th>Manufacture Price</Th>
            <Th>Store Price</Th>
            <Th>Available Stocks</Th>
            <Th>Quantity</Th>
            <Th>Discount</Th>
            <Th>VAT</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryData &&
            inventoryData?.map((data: Inventory, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.products.name}</Td>
                  <Td>{data.products.category}</Td>
                  <Td>{data.products.generic_name}</Td>
                  <Td>{`₱ ${data.manufacture_price}`}</Td>
                  <Td>{`₱ ${data.srp_price}`}</Td>
                  <Td>{data.quantity}</Td>
                  <Td>
                    <NumberInput
                    key={data.id}
                    onChange={event => handleInputChange(event, i)}
                    value={inputValues[i]}
                    max={data.quantity}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    {errorMessage && errorIndex === i ? <Text color='tomato'> {errorMessage}!</Text> : null}

                  </Td>

                  <Td>
                    {' '}
                    <Checkbox
                      key={data.id}
                      isChecked={checkedItems.includes(data.id)}
                      onChange={() => handleCheck(data.id)}
                    >
                      {(data.srp_price * (20 / 100)).toFixed(2)}
                    </Checkbox>
                  </Td>
                  <Td>{data.vat}</Td>

                  <Td>
                    <Button
                      colorScheme='blue'
                      onClick={() =>
                        handleAdd(data, checkedItems.includes(data.id), inputValues[i], i)
                      }
                    >
                      Add
                    </Button>
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
    </TableContainer>
  )
}

export default OrderList
