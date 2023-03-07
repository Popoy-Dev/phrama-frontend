import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,

} from '@chakra-ui/react'
import UserForm from './CustomerForm'

const UserModal =({initialFocusRef, finalFocusRef, isOpen, onClose, updateData} : any) => {
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
        <UserForm onClose={onClose} updateData={updateData} />
      </Modal>
    </>
  )
}

export default UserModal