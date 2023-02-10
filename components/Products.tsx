import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'

import ProductList from './products/ProductList'
import ProductModal from './products/ProductModal'

function Products() {
  const [isOpen, setIsOpen] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = (data:[])  => {
    if(data) {
      setReloadList(true)
    }
    setIsOpen(false)
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
            <ProductModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        </Flex>
        <Box p='4'>
          <ProductList reloadList={reloadList} />
        </Box>
      </Card>
    </div>
  )
}

export default Products
