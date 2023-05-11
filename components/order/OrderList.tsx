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
  Badge,
  Spacer,
  Flex,
} from '@chakra-ui/react'

import { supabase } from '../../supabaseClient'

interface Inventory {
  id: number
  products: { name: string; category: string; generic_name: string }
  batch_number: number
  manufacture_price: number
  srp_price: number
  quantity: number
  expiry_date: Date
  is_vatable: boolean
  ordered_quantity: number
}
const OrderList = ({ inventoryData, handleAddOrder }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [errorIndex, setErrorIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  function handlePrevPage() {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleAdd = (data: any, id: any, order_quantity: number, i: number) => {
    console.log('hello')
    if (
      !order_quantity ||
      order_quantity <= 0 ||
      data.quantity - data.ordered_quantity === 0
    ) {
      setErrorIndex(i)
      setErrorMessage('Please input quantity')
    } else {
      const newData = {
        ...data,
        discounted: id,
        order_quantity: order_quantity,
        product_order: Math.floor(Math.random() * 100),
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
  const [inputValues, setInputValues] = useState([])
  console.log('inputValues', inputValues)
  const handleInputChange = (event: any, index: any) => {
    setInputValues((prevInputValues) => {
      const updatedInputValues: any = [...prevInputValues]
      updatedInputValues[index] = event
      return updatedInputValues
    })
  }
  function paginate(array: [], page_size: any, page_number: any) {
    return array.slice((page_number - 1) * page_size, page_number * page_size)
  }
  const paginatedData = paginate(inventoryData, 10, currentPage)
  function handleKeyPress(event: any, id: number) {
    if (event.key === "Enter") {
      handleCheck(id);
    }
  }
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <TableCaption>Fayne Pharmacy 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Discount</Th>
            <Th>VAT</Th>
            <Th>Action</Th>
            <Th>Type</Th>
            <Th>Generic name</Th>
            <Th>Manufacture Price</Th>
            <Th>Store Price</Th>
            <Th>Available Stocks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryData &&
            paginatedData?.map((data: Inventory, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{data.quantity - data.ordered_quantity}</Td>
                  <Td>
                    <NumberInput
                      key={data.id}
                      onChange={(event) => handleInputChange(event, i)}
                      value={inputValues[i]}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {(() => {
                      if (
                        (data.quantity - data.ordered_quantity === 0 &&
                          errorIndex === i) ||
                        data.quantity - data.ordered_quantity <
                          inputValues[i] ||
                        inputValues[i] <= 0
                      ) {
                        return (
                          <Text color='tomato'>
                            {errorMessage !== '' ? errorMessage : 'No stocks'}
                          </Text>
                        )
                      } else if (errorMessage && errorIndex === i) {
                        return <Text color='tomato'>{errorMessage}!</Text>
                      }
                    })()}
                  </Td>
                  <Td>
                    {' '}
                    <Checkbox
                      key={data.id}
                      isChecked={checkedItems.includes(data.id)}
                      onChange={() => handleCheck(data.id)}
                      onKeyPress={(event) => handleKeyPress(event, data.id)}
                    >
                      {data.is_vatable
                        ? ((data.srp_price / 1.12) * (20 / 100)).toFixed(2)
                        : (data.srp_price * (20 / 100)).toFixed(2)}
                    </Checkbox>
                  </Td>
                  <Td>
                    {data.is_vatable ? (
                      <Badge colorScheme='green'>With VAT</Badge>
                    ) : (
                      <Badge colorScheme='red'>Non VAT</Badge>
                    )}
                  </Td>

                  <Td>
                    <Button
                      colorScheme='blue'
                      isDisabled={
                        data.quantity - data.ordered_quantity < inputValues[i]
                      }
                      onClick={() =>
                        handleAdd(
                          data,
                          checkedItems.includes(data.id),
                          parseInt(inputValues[i]),
                          i
                        )
                      }
                    >
                      Add
                    </Button>
                  </Td>
                  <Td>{data.products.category}</Td>
                  <Td>{data.products.generic_name}</Td>
                  <Td>{`₱ ${data.manufacture_price}`}</Td>
                  <Td>{`₱ ${data.srp_price.toFixed(2)}`}</Td>
                  <Td>{data.quantity - data.ordered_quantity}</Td>
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
    </TableContainer>
  )
}

export default OrderList
