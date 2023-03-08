import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import Logo from './../public/fayne-pharmacy-logo.ico'
import { useRouter } from 'next/router'
import { ReactText } from 'react'
import { supabase } from './../supabaseClient'
import Products from '../components/Products'
import Inventory from '@/components/Inventory'
import Order from '@/components/Order'
import Reports from '@/components/Reports'
import Customers from '@/components/Customers'
interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Reports', icon: FiHome },
  { name: 'Products', icon: FiHome },
  { name: 'Inventory', icon: FiTrendingUp },
  { name: 'Order', icon: FiCompass },
  { name: 'Customers', icon: FiStar },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
]

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userInfo, setUserInfo]: any = useState([])
  const [content, setContent]: any = useState('')
  const getInfo = async () => {
    const { data, error }: any = await supabase.auth.getSession()

    if (data) {
      const result: any = await supabase
        .from('user')
        .select()
        .eq('uid', data?.session?.user?.user_metadata?.user_id)
      setUserInfo(result?.data)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  useEffect(() => {
    ContentDashboard()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  const ContentDashboard = (): any => {
    switch (content) {
      case 'Products':
        return <Products />

      case 'Inventory':
        return <Inventory />

      case 'Order':
        return <Order />
      case 'Reports':
        return <Reports />
      case 'Customers':
        return <Customers />

      default:
        break
    }
  }
  const handleDashboardContent = (name: string): any => {
    setContent(name)
    onClose()
  }

  return (
    <Box minH='100vh' bg={'gray.100'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        handleDashboardContent={handleDashboardContent}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            handleDashboardContent={handleDashboardContent}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userInfo={userInfo} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        <ContentDashboard />
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, handleDashboardContent, ...rest }: any) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src={Logo.src} alt='' className='w-4/5 h-4/5' />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => handleDashboardContent(link.name)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
  userInfo: any
}
const MobileNav = ({ onOpen, userInfo, ...rest }: MobileProps) => {
  const router = useRouter()
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    router.push('/')
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>{`${userInfo[0]?.firstname} ${userInfo[0]?.lastname}`}</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default SidebarWithHeader
