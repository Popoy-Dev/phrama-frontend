import React, { useState } from 'react'
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
import ProductForm from './ProductForm'

const ProductModal =({initialFocusRef, finalFocusRef, isOpen, onClose, updateData} : any) => {
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
        <ProductForm onClose={onClose} updateData={updateData} />
      </Modal>
    </>
  )
}

export default ProductModal