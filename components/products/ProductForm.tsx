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
        if (!error) {
          onClose(data)
        } else {
          setErrorMessage('Duplicate Name or Code!')
        }
      }
    },
  })
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
            <FormControl>
              <FormLabel>Medicine Type</FormLabel>
              <Select as={Select}
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

export default ProductForm
