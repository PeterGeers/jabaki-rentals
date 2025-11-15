import { HStack, Input, Button, Box } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  return (
    <Box bg="white" p={2} borderRadius="full" shadow="lg" maxW="600px" w="full">
      <HStack spacing={0}>
        <Input
          placeholder="Where are you going?"
          border="none"
          _focus={{ boxShadow: 'none' }}
          px={6}
        />
        <Input
          placeholder="Check-in"
          border="none"
          _focus={{ boxShadow: 'none' }}
          px={6}
          type="date"
        />
        <Input
          placeholder="Check-out"
          border="none"
          _focus={{ boxShadow: 'none' }}
          px={6}
          type="date"
        />
        <Button
          leftIcon={<FiSearch />}
          variant="primary"
          borderRadius="full"
          px={8}
        >
          Search
        </Button>
      </HStack>
    </Box>
  )
}

export default SearchBar