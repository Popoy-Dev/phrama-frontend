import React from 'react'
import { Modal, ModalOverlay } from '@chakra-ui/react'
import ProductForm from './ProductForm'

const ViewModal = ({
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
        <ProductForm onClose={onClose} />
      </Modal>
    </>
  )
}

export default ViewModal
