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
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react'
import { supabase } from '../../supabaseClient'

interface User {
  surname: string
  middle_name: string
  first_name: string
  osca_id: number
  birthday: Date
  contact_number: number
  address: string
  designated: string
  id_register_date: number
}

const UserForm = ({ onClose, updateData=[] }: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const formik= useFormik({
    initialValues: {
      surname: updateData?.surname || '',
      middle_name: updateData?.middle_name || '',
      first_name: updateData?.first_name || '',
      osca_id: updateData?.osca_id || '',
      birthday: updateData?.birthday || '',
      contact_number: updateData?.contact_number || '',
      address: updateData?.address || '',
      designated: updateData?.designated || '',
      id_register_date: updateData?.id_register_date || '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      if (updateData?.length !== 0) {
        const {data, error } = await supabase
          .from('customers')
          .update({
            surname: values.surname,
            middle_name: values.middle_name,
            first_name: values.first_name,
            osca_id: values.osca_id,
            birthday: values.birthday,
            contact_number: values.contact_number,
            address: values.address,
            designated: values.designated,
            id_register_date: values.id_register_date,
          })
          .eq('id', updateData?.id)
          .select()

        if (!error) {
          setIsLoading(false)
          onClose(data)
        } else {
          setIsLoading(false)
          setErrorMessage('Duplicate Name or Code!')
        }
      } else {
        const {data, error } = await supabase.from('customers').insert({
            surname: values.surname,
            middle_name: values.middle_name,
            first_name: values.first_name,
            osca_id: values.osca_id,
            birthday: values.birthday,
            contact_number: values.contact_number,
            address: values.address,
            designated: values.designated,
            id_register_date: values.id_register_date,
        }).select()
        if (!error) {
          setIsLoading(false)
          onClose(data)
        } else {
          setIsLoading(false)
          setErrorMessage('Duplicate Name or Code!')
        }
      }
    },
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>   {updateData?.length === 0 ? 'Create Product' : 'Update Product'}</ModalHeader>
          {errorMessage && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{` ${errorMessage}`!}</AlertTitle>
            </Alert>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.surname}
                id='surname'
                name='surname'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.middle_name}
                id='middle_name'
                name='middle_name'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.first_name}
                id='first_name'
                name='first_name'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>OSCA ID</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.osca_id}
                id='osca_id'
                name='osca_id'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Designated</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.designated}
                id='designated'
                name='designated'
                type='text'
              />
            </FormControl>
            <FormControl>
              <FormLabel>Birth Day</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder='Select Birthday'
                size='md'
                type='date'
                name='birthday'
                value={formik.values.birthday}
              />
              {formik.errors.birthday ? <Text color='tomato'> Please select expiry date!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder='Fortune Marikina City'
                size='sm'
                name='address'

              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <NumberInput
                value={formik.values.contact_number}
                name='contact_number'
              >
                <NumberInputField onChange={formik.handleChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.contact_number ? <Text color='tomato'> Please input quantity!</Text> : null}

            </FormControl>
            <FormControl>
              <FormLabel>Date ID Register</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder='Select Date and Time'
                size='md'
                type='date'
                name='id_register_date'
                value={formik.values.id_register_date}
              />
              {formik.errors.id_register_date ? <Text color='tomato'> Please select expiry date!</Text> : null}

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={isLoading} type='submit' colorScheme='blue' mr={3}>
              {updateData?.length === 0 ? 'Save' : 'Update'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </>
  )
}

export default UserForm
