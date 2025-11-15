import { Container, Text, SimpleGrid, Box } from '@chakra-ui/react'
import ListingCard from '../components/ListingCard'

const ListingsPage = () => {
  const listings = [
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
    },
    {
      id: '3',
      title: 'Canal View Studio',
      location: 'Amsterdam',
      price: 85,
      rating: 4.7,
      imageId: 'sample-image-id-3'
    }
  ]

  return (
    <Container maxW="1200px" py={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={8}>
        All Listings
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default ListingsPage