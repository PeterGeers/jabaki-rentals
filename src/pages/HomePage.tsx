import { Box, Container, Text, Button, SimpleGrid, Image, VStack, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ListingCard from '../components/ListingCard'

const HomePage = () => {
  const navigate = useNavigate()

  const featuredListings = [
    {
      id: '1',
      title: 'Cozy Amsterdam Apartment',
      location: 'Amsterdam Center',
      price: 120,
      rating: 4.8,
      imageId: 'sample-image-id-1'
    },
    {
      id: '2', 
      title: 'Modern Haarlem House',
      location: 'Near Keukenhof',
      price: 95,
      rating: 4.9,
      imageId: 'sample-image-id-2'
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="1200px">
          <VStack spacing={8} textAlign="center">
            <Text fontSize="5xl" fontWeight="bold">Find your next stay</Text>
            <Text fontSize="xl" color="gray.600">
              Discover amazing places to stay in Amsterdam and surroundings
            </Text>
            <SearchBar />
          </VStack>
        </Container>
      </Box>

      {/* Featured Listings */}
      <Container maxW="1200px" py={16}>
        <Text fontSize="3xl" fontWeight="bold" mb={8}>Featured stays</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {featuredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Events Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="1200px">
          <Text fontSize="3xl" fontWeight="bold" mb={8}>Upcoming Events</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <EventCard title="Keukenhof Gardens" date="Mar - May 2024" />
            <EventCard title="Amsterdam Dance Event" date="Oct 2024" />
            <EventCard title="Dutch F1 Grand Prix" date="Aug 2024" />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

const EventCard = ({ title, date }: { title: string; date: string }) => (
  <Box bg="white" p={6} borderRadius="lg" shadow="sm">
    <Text fontWeight="bold" fontSize="lg">{title}</Text>
    <Text color="gray.600">{date}</Text>
  </Box>
)

export default HomePage