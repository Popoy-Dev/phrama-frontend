import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import authSlice from './shared/slices/auth-slice'
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
} from '@chakra-ui/react'

const SimpleCard = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { login } = useSelector((state: any) => state.auth)
  const { verifyLogin }: any = authSlice.actions

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: object): any => {
      console.log('values', values)
      dispatch(verifyLogin(values))
    },
  })

  useEffect(() => {
     if(login?.data?.token ) {
      console.log('data?.data', login?.data)
      localStorage.setItem('token', login?.data?.token);
      router.push('/dashboard')
    } 

    console.log('get token signINNNNN', localStorage.getItem('token'))

    
  }, [login, router])

  console.log('data', login)
  console.log('login?.data?.token', login?.data?.token)
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.00'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'gray.300'} boxShadow={'lg'} p={8}>
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
