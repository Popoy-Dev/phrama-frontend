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

import InventoryModal from './invetory/InventoryModal'
import InventoryList from './invetory/InventoryList'

const Inventory = () => {
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
            <Heading size='md'>Inventory</Heading>
          </CardHeader>

          <Spacer />
          <Box p='4'>
            <Button colorScheme='gray' size='md' onClick={onOpen}>
              Create Inventory
            </Button>
            <InventoryModal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Box>
        </Flex>
        <Box p='4'>
          <InventoryList reloadList={reloadList} />
        </Box>
      </Card>
    </div>
  )
}

export default Inventory
