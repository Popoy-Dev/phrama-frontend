import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Select,
  AlertIcon,
  AlertTitle,
  NumberInputField,
  NumberInputStepper,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'

const InventoryForm = ({ onClose, updateData = [] }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [productData, setProductData] = useState([{ id: 0, name: '' }])
  const formik = useFormik({
    initialValues: {
      product_name: updateData?.product_name || '',
      batch_number: updateData?.batch_number || '',
      srp_price: updateData?.srp_price || '',
      manufacture_price: updateData?.manufacture_price || '',
      quantity: updateData?.quantity || '',
      expiry_date: updateData?.expiry_date || '',
      
      
    },
    onSubmit: async (values) => {
      console.log('valuies',values)
      if (updateData?.length !== 0) {
        const { data, error } = await supabase
          .from('inventory')
          .update({
            product_name: values.product_name,
            batch_number: values.batch_number,
            manufacture_price: values.manufacture_price,
            srp_price: values.srp_price,
            quantity: values.quantity,
            expiry_date: values.expiry_date,
          })
          .eq('id', updateData?.id)
          .select()

        if (!error) {
          onClose(data)
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      } else {
        const { data, error } = await supabase
          .from('inventory')
          .insert({
            product_name: values.product_name,
            batch_number: values.batch_number,
            manufacture_price: values.manufacture_price,
            srp_price: values.srp_price,
            quantity: values.quantity,
            expiry_date: values.expiry_date,
          })
          .select()
      console.log(' data valuies',values)
          
        if (!error) {
          onClose(data)
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      }
    },
  })

  const getProducts = async () => {
    const { data, error }: any = await supabase
      .from('products')
      .select('id, name')
    console.log('data', data)
    setProductData(data)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>Create Inventory</ModalHeader>
          {errorMessage && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{` ${errorMessage}`!}</AlertTitle>
            </Alert>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of Product</FormLabel>

              <Select
                as={Select}
                placeholder='Select Product Name'
                onChange={formik.handleChange}
                value={formik.values.product_name}
                name='product_name'
              >
                {productData.map((data): any => {
                  return (
                    <option value={data?.id} key={data.id}>
                      {data.name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
           
            {/* <FormControl>
              <FormLabel>Batch Number</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.batch_number}
                id='batchnumber'
                name='batch_number'
                type='text'
              />
            </FormControl> */}
            <FormControl>
              <FormLabel>Batch Number</FormLabel>

              <NumberInput>
                <NumberInputField
                  onChange={formik.handleChange}
                  value={formik.values.batch_number}
                  name='batch_number'
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Manufacture Price</FormLabel>

              <NumberInput>
                <NumberInputField
                  onChange={formik.handleChange}
                  value={formik.values.manufacture_price}
                  name='manufacture_price'
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>SRP Price</FormLabel>

              <NumberInput>
                <NumberInputField
                  onChange={formik.handleChange}
                  value={formik.values.srp_price}
                  name='srp_price'
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
           
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <NumberInput>
                <NumberInputField
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  name='quantity'
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder='Select Date and Time'
                size='md'
                type='date'
                name='expiry_date'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='blue' mr={3}>
              {updateData?.length === 0 ? 'Save' : 'Update'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </>
  )
}

export default InventoryForm
