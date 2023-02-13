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
} from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'

const InventoryForm = ({ onClose, updateData = [] }: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [productData, setProductData] = useState([{ id: 0, name: '' }])
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
        const { data, error } = await supabase
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
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert({
            name: values.name.toUpperCase(),
            indication: values.indication,
            code: values.code,
            category: values.category,
            precaution: values.precaution,
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
                value={formik.values.category}
                name='category'
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
                as={Select}
                placeholder='Select Medicine Type'
                onChange={formik.handleChange}
                value={formik.values.category}
                name='category'
              >
                <option value='branded'>Branded</option>
                <option value='generic'>Generic</option>
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
