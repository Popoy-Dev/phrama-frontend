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
  Text,
} from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'
import validate from './validate'

const InventoryForm = ({ onClose, updateData = [] }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [productData, setProductData] = useState([{ id: 0, name: '' }])
  const formik = useFormik({
    initialValues: {
      product_id: updateData?.product_id || '',
      batch_number: updateData?.batch_number || '',
      srp_price: updateData?.srp_price || '',
      manufacture_price: updateData?.manufacture_price || '',
      quantity: updateData?.quantity || '',
      expiry_date: updateData?.expiry_date || '',
      is_vatable: updateData?.is_vatable || false,
    },
    validate,
    onSubmit: async (values) => {
      if (updateData?.length !== 0) {
        const { data, error } = await supabase
          .from('inventory')
          .update({
            product_id: values.product_id,
            batch_number: values.batch_number,
            manufacture_price: values.manufacture_price,
            srp_price: values.srp_price,
            quantity: values.quantity,
            expiry_date: values.expiry_date,
            is_vatable: values.is_vatable,
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
            product_id: values.product_id,
            batch_number: values.batch_number,
            manufacture_price: values.manufacture_price,
            srp_price: values.srp_price,
            quantity: values.quantity,
            expiry_date: values.expiry_date,
            is_vatable: values.is_vatable,
          })
          .select()

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
    setProductData(data)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader> {updateData?.length === 0 ? 'Create Inventory' : 'Update Inventory'}</ModalHeader>
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
                value={formik.values.product_id}
                name='product_id'
                id="product_id"
                as={Select}
                placeholder='Select Product Name'
                onChange={formik.handleChange}
              >
                {productData.map((data): any => {
                  return (
                    <option value={data?.id} key={data.id}>
                      {data.name}
                    </option>
                  )
                })}
              </Select>
              {formik.errors.product_id ? <Text color='tomato'> Please select product name!</Text> : null}
            </FormControl>
         
            <FormControl>
              <FormLabel>Batch Number</FormLabel>

              <NumberInput
                name='batch_number'
                value={formik.values.batch_number}
              >
                <NumberInputField onChange={formik.handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.batch_number ? <Text color='tomato'> Please input batch number!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>Manufacture Price</FormLabel>

              <NumberInput
                value={formik.values.manufacture_price}
                name='manufacture_price'
              >
                <NumberInputField onChange={formik.handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.manufacture_price ? <Text color='tomato'> Please input manufacture price!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>SRP Price</FormLabel>

              <NumberInput
                value={formik.values.srp_price}
                name='srp_price'
              >
                <NumberInputField onChange={formik.handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.srp_price ? <Text color='tomato'> Please input srp price!</Text> : null}
            </FormControl>

            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                
                value={formik.values.quantity}
                name='quantity'
              >
                <NumberInputField onChange={formik.handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.quantity ? <Text color='tomato'> Please input quantity!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder='Select Date and Time'
                size='md'
                type='date'
                name='expiry_date'
                value={formik.values.expiry_date}
              />
              {formik.errors.expiry_date ? <Text color='tomato'> Please select expiry date!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>VAT Type</FormLabel>
              <Select as={Select}
                placeholder='Select VAT Type'
                onChange={formik.handleChange}
                value={formik.values.is_vatable}

                name='is_vatable'
              >
                <option value='true'>With VAT</option>
                <option value='false'>Non VAT</option>
              </Select>
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
