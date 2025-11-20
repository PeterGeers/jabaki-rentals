import { Box, Flex, Text, Button, HStack, IconButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'

const Header = () => {


  return (
    <Box borderBottom="1px" borderColor="gray.200" bg="white" position="sticky" top={0} zIndex={1000}>
      <Flex maxW="1200px" mx="auto" px={6} py={4} align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold" color="red.500">JaBaKi</Text>
        </Link>
        
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Link to="/"><Text _hover={{ color: 'red.500' }}>Home</Text></Link>
          <Link to="/listings"><Text _hover={{ color: 'red.500' }}>Listings</Text></Link>
          <Link to="/events"><Text _hover={{ color: 'red.500' }}>Events</Text></Link>
        </HStack>

        <HStack spacing={2}>
          <Button variant="ghost" size="sm">Host your home</Button>
          <IconButton
            aria-label="User menu"
            icon={<FiUser />}
            variant="outline"
            size="sm"
            borderRadius="full"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header