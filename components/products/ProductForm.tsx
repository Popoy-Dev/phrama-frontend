import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'

const ProductForm = ({ onClose, updateData=[] }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const formik = useFormik({
    initialValues: {
      name: updateData?.name || '',
      indication: updateData?.indication || '',
      code: updateData?.code || '',
      category: updateData?.category || '',
      precaution: updateData?.precaution || '',
    },
    onSubmit: async (values) => {
      if (updateData?.length !== 0) {
        const {data, error } = await supabase
          .from('products')
          .update({
            name: values.name.toUpperCase(),
            indication: values.indication,
            code: values.code,
            category: values.category,
            precaution: values.precaution,
          })
          .eq('id', updateData?.id)
          .select()

        if (!error) {
          onClose(data)
          // window.location.reload()
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      } else {
        const {data, error } = await supabase.from('products').insert({
          name: values.name.toUpperCase(),
          indication: values.indication,
          code: values.code,
          category: values.category,
          precaution: values.precaution,
        }).select()
        console.log('data save', data)
        if (!error) {
          onClose(data)
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      }
    },
  })
  console.log('updateData', updateData)
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>Create Products</ModalHeader>
          {errorMessage && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{` ${errorMessage}`!}</AlertTitle>
            </Alert>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.name}
                id='name'
                name='name'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Indication</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.indication}
                id='indication'
                name='indication'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Code</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.code}
                id='code'
                name='code'
                type='text'
              />
            </FormControl>

            <FormControl>
              <FormLabel>Pre Caution</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.precaution}
                id='precaution'
                name='precaution'
                type='text'
              />
            </FormControl>
            {/* <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  placeholder='Select Date and Time'
                  size='md'
                  type='date'
                  name='expiry_date'
                />
              </FormControl> */}
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
            {/* <FormControl>
                <FormLabel>SRP Price</FormLabel> */}

            {/* <NumberInput>
                  <NumberInputField
                    onChange={formik.handleChange}
                    value={formik.values.srp_price}
                    name='srp_price'
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput> */}
            {/* </FormControl> */}
            {/* <FormControl>
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
              </FormControl> */}
            {/* <FormControl>
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
              </FormControl> */}
            <FormControl>
              <FormLabel>Medicine Type</FormLabel>
              <Select
                placeholder='Select Medicine Type'
                onChange={formik.handleChange}
                name='category'
              >
                <option value='branded'>Branded</option>
                <option value='generic'>generic</option>
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

export default ProductForm
