import { Box, Flex, Text, Button, HStack, IconButton, VStack, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { t } = useTranslation()

  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white" position="sticky" top={0} zIndex={1000}>
      <Flex maxW="1200px" mx="auto" px={6} py={4} align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold" color="red.500">JaBaKi</Text>
        </Link>
        
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link to="/"><Text _hover={{ color: 'red.500' }}>{t('Home')}</Text></Link>
          <Link to="/events"><Text _hover={{ color: 'red.500' }}>{t('Events')}</Text></Link>
          <Link to="/good-to-know"><Text _hover={{ color: 'red.500' }}>{t('Good to know')}</Text></Link>
        </HStack>

        <HStack spacing={2}>
          <Button variant="ghost" size="sm" display={{ base: 'none', md: 'flex' }}>Host your home</Button>
          <IconButton
            aria-label="User menu"
            icon={<FiUser />}
            variant="outline"
            size="sm"
            borderRadius="full"
            display={{ base: 'none', md: 'flex' }}
          />
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? <FiX /> : <FiMenu />}
            variant="ghost"
            size="sm"
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
          />
        </HStack>
      </Flex>
      
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack spacing={4} align="stretch" px={6}>
            <Link to="/" onClick={onToggle}>
              <Text _hover={{ color: 'red.500' }}>{t('Home')}</Text>
            </Link>
            <Link to="/events" onClick={onToggle}>
              <Text _hover={{ color: 'red.500' }}>{t('Events')}</Text>
            </Link>
            <Link to="/good-to-know" onClick={onToggle}>
              <Text _hover={{ color: 'red.500' }}>{t('Good to know')}</Text>
            </Link>
            <Button variant="ghost" size="sm" justifyContent="flex-start">{t('Host your home')}</Button>
            <Button leftIcon={<FiUser />} variant="outline" size="sm" justifyContent="flex-start">
              Account
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default Header