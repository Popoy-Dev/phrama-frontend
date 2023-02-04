import React from 'react'
import { useFormik } from 'formik'
import {
  Card,
  CardHeader,
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react'
function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const Modals = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2))
      },
    })
    return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Create Products</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* <FormControl>
            <FormLabel>First name</FormLabel>
            <Input ref={initialRef} placeholder='First name' />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' />
          </FormControl> */}

              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id='name'
                  name='name'
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Indication</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id='indication'
                  name='indication'
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Code</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id='code'
                  name='code'
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  placeholder='Select Date and Time'
                  size='md'
                  type='datetime-local'
                  name='code'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Batch Number</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id='batchnumber'
                  name='batchnumber'
                  type='text'
                />
              </FormControl>
              <FormControl>
                <FormLabel>SRP Price</FormLabel>

                <NumberInput>
                  <NumberInputField
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    name='srp_price'
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
                    value={formik.values.email}
                    name='manufacture_price'
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
                    value={formik.values.email}
                    name='manufacture_price'
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id='category'
                  name='category'
                  type='text'
                />
              </FormControl>
           
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Select placeholder='Select country'>
                  <option>United Arab Emirates</option>
                  <option>Nigeria</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    )
  }
  return (
    <div>
      <Card>
        <Flex>
          <CardHeader className='flex justify-between'>
            <Heading size='md'>Products</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='teal' size='md' onClick={onOpen}>
              Create Product
            </Button>
            <Modals />
          </Box>
        </Flex>
      </Card>
    </div>
  )
}

export default Products
