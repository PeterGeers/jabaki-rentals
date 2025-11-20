import { Box, Container, Text, SimpleGrid, Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import SearchBar from '../components/SearchBar'
import ListingCard from '../components/ListingCard'
import { useGoogleImage } from '../hooks/useGoogleImage'
import imagesData from '../data/images.json'

const HomePage = () => {


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

      {/* Accommodations Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="1200px">
          <Text fontSize="3xl" fontWeight="bold" mb={8}>Our Accommodations</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <AccommodationCard 
              id="gardenhouse"
              name="Garden House" 
              description="Cozy house with beautiful garden terrace"
            />
            <AccommodationCard 
              id="green-studio"
              name="Green Studio" 
              description="Modern studio with scenic views"
            />
            <AccommodationCard 
              id="red-studio"
              name="Red Studio" 
              description="Stylish studio with rooftop terrace"
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

const AccommodationCard = ({ id, name, description }: { id: string; name: string; description: string }) => {
  const { t } = useTranslation()
  // Prefer 'voordeur' if available, otherwise pick first image in the property
  const propertyImages = (imagesData.properties as any)[id] || {}
  let imageId = ''
  if ('voordeur' in propertyImages) {
    imageId = propertyImages['voordeur']
  } else {
    const vals = Object.values(propertyImages)
    imageId = vals.length > 0 ? vals[0] as string : ''
  }
  const { imageUrl } = useGoogleImage(imageId)

  const warnings: string[] = []
  if (!imageId) warnings.push(`${t(name)}: ${t('voordeur') || 'voordeur'} niet zichtbaar`)

  return (
    <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
      <Image 
        src={imageUrl || '/placeholder.jpg'} 
        alt={name}
        h="200px" 
        w="100%" 
        objectFit="cover"
        loading="lazy"
      />
      <Box p={6}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>{name}</Text>
        <Text color="gray.600">{description}</Text>
        {warnings.length > 0 && (
          <Box mt={3} color="red.600" fontSize="sm">
            {warnings.map((w, i) => (
              <div key={i}>{w}</div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage