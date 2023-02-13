import React from 'react'
import { Modal, ModalOverlay } from '@chakra-ui/react'
import InventoryForm from './InventoryForm'

const InventoryModal = ({
  initialFocusRef,
  finalFocusRef,
  isOpen,
  onClose,
}: any) => {
  return (
    <>
      <Modal
        initialFocusRef={initialFocusRef}
        finalFocusRef={finalFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <InventoryForm onClose={onClose} />
      </Modal>
    </>
  )
}

export default InventoryModal
