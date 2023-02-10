import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { supabase } from './../supabaseClient'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,

} from '@chakra-ui/react'

const SimpleCard = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: any) => {
      const { data, error }: any = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })
      const uid = data?.user?.user_metadata?.user_id

      if (uid) {
        router.push('/dashboard')
      }
      if (error) {
        setErrorMessage(error.message)
      }

    },
  })

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.100'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'gray.200'} boxShadow={'lg'} p={8}>
          {errorMessage && (
           <Alert status='error'>
           <AlertIcon />
           <AlertTitle>{` ${errorMessage}`!}</AlertTitle>
         </Alert>
          )}
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SimpleCard
