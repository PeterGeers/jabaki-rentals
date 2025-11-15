import { Box, Image, Text, HStack, Icon } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useGoogleImage } from '../hooks/useGoogleImage'

interface Listing {
  id: string
  title: string
  location: string
  price: number
  rating: number
  imageId: string
}

interface ListingCardProps {
  listing: Listing
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const navigate = useNavigate()
  const { imageUrl, loading } = useGoogleImage(listing.imageId)

  return (
    <Box
      cursor="pointer"
      onClick={() => navigate(`/book/${listing.id}`)}
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      transition="all 0.2s"
    >
      <Box position="relative" mb={3}>
        <Image
          src={imageUrl || '/placeholder.jpg'}
          alt={listing.title}
          w="full"
          h="200px"
          objectFit="cover"
          borderRadius="lg"
          loading="lazy"
        />
      </Box>
      
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="600" fontSize="sm" noOfLines={1}>
          {listing.location}
        </Text>
        <HStack spacing={1}>
          <Icon as={FiStar} boxSize={3} />
          <Text fontSize="sm">{listing.rating}</Text>
        </HStack>
      </HStack>
      
      <Text color="gray.600" fontSize="sm" noOfLines={1} mb={1}>
        {listing.title}
      </Text>
      
      <Text fontWeight="600">
        €{listing.price} <Text as="span" fontWeight="normal">night</Text>
      </Text>
    </Box>
  )
}

export default ListingCard