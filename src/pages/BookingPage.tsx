import { Container, Grid, Box, Image, Text, VStack, HStack, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'

const BookingPage = () => {
  const { id } = useParams()

  // Mock listing data - in real app, fetch by ID
  const listing = {
    id: id || '1',
    title: 'Cozy Amsterdam Apartment',
    location: 'Amsterdam Center',
    price: 120,
    rating: 4.8,
    images: ['sample-image-1', 'sample-image-2'],
    description: 'Beautiful apartment in the heart of Amsterdam, walking distance to major attractions.',
    amenities: ['WiFi', 'Kitchen', 'Washing machine', 'Air conditioning'],
    host: 'JaBaKi Rentals'
  }

  return (
    <Container maxW="1200px" py={8}>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12}>
        {/* Left Column - Property Details */}
        <VStack align="start" spacing={6}>
          <Image
            src="/placeholder.jpg"
            alt={listing.title}
            w="full"
            h="400px"
            objectFit="cover"
            borderRadius="lg"
          />
          
          <VStack align="start" spacing={4} w="full">
            <Text fontSize="3xl" fontWeight="bold">{listing.title}</Text>
            <Text color="gray.600">{listing.location}</Text>
            
            <Box h="1px" bg="gray.200" w="full" />
            
            <Text fontSize="lg">{listing.description}</Text>
            
            <Box>
              <Text fontWeight="bold" mb={2}>Amenities</Text>
              <VStack align="start" spacing={1}>
                {listing.amenities.map(amenity => (
                  <Text key={amenity}>• {amenity}</Text>
                ))}
              </VStack>
            </Box>
          </VStack>
        </VStack>

        {/* Right Column - Booking Form */}
        <Box position="sticky" top="100px">
          <BookingForm listing={listing} />
        </Box>
      </Grid>
    </Container>
  )
}

export default BookingPage