import { Container, Text, SimpleGrid, Box, Image, VStack, Button } from '@chakra-ui/react'

const EventsPage = () => {
  const events = [
    {
      id: '1',
      title: 'Keukenhof Gardens',
      description: 'World famous flower garden with millions of tulips',
      date: 'March - May 2024',
      location: 'Lisse, Netherlands',
      imageId: 'keukenhof-image-id'
    },
    {
      id: '2',
      title: 'Amsterdam Dance Event',
      description: 'The worlds biggest club festival and conference',
      date: 'October 2024',
      location: 'Amsterdam',
      imageId: 'ade-image-id'
    },
    {
      id: '3',
      title: 'Dutch F1 Grand Prix',
      description: 'Formula 1 racing at Circuit Zandvoort',
      date: 'August 2024',
      location: 'Zandvoort',
      imageId: 'f1-image-id'
    },
    {
      id: '4',
      title: 'Mysteryland',
      description: 'Electronic music festival in beautiful natural setting',
      date: 'August 2024',
      location: 'Haarlemmermeer',
      imageId: 'mysteryland-image-id'
    }
  ]

  return (
    <Container maxW="1200px" py={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={8}>
        Events & Attractions
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

const EventCard = ({ event }: { event: any }) => (
  <Box bg="white" borderRadius="lg" overflow="hidden" shadow="md">
    <Image
      src="/placeholder.jpg"
      alt={event.title}
      w="full"
      h="200px"
      objectFit="cover"
    />
    <VStack align="start" p={6} spacing={3}>
      <Text fontSize="xl" fontWeight="bold">{event.title}</Text>
      <Text color="gray.600">{event.description}</Text>
      <Text fontWeight="600" color="red.500">{event.date}</Text>
      <Text fontSize="sm" color="gray.500">{event.location}</Text>
      <Button colorScheme="red" size="sm">Learn More</Button>
    </VStack>
  </Box>
)

export default EventsPage