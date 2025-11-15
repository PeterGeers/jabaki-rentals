import { Box, VStack, HStack, Text, Input, Button } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

interface BookingFormProps {
  listing: {
    price: number
    title: string
  }
}

const BookingSchema = Yup.object().shape({
  checkIn: Yup.date().required('Check-in date is required'),
  checkOut: Yup.date().required('Check-out date is required'),
  guests: Yup.number().min(1).required('Number of guests is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Name is required')
})

const BookingForm = ({ listing }: BookingFormProps) => {
  const handleSubmit = async (values: any) => {
    // Integration with Guesty API would go here
    console.log('Booking submission:', values)
    alert('Booking request submitted! We will contact you shortly.')
  }

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="lg" border="1px" borderColor="gray.200">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">€{listing.price}</Text>
        <Text>per night</Text>
      </HStack>

      <Formik
        initialValues={{
          checkIn: '',
          checkOut: '',
          guests: 1,
          name: '',
          email: ''
        }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <HStack w="full" spacing={2}>
                <Field name="checkIn">
                  {({ field }: any) => (
                    <Input {...field} type="date" placeholder="Check-in" />
                  )}
                </Field>
                <Field name="checkOut">
                  {({ field }: any) => (
                    <Input {...field} type="date" placeholder="Check-out" />
                  )}
                </Field>
              </HStack>

              <Field name="guests">
                {({ field }: any) => (
                  <Input {...field} type="number" placeholder="Guests" min={1} />
                )}
              </Field>

              <Field name="name">
                {({ field }: any) => (
                  <Input {...field} placeholder="Full Name" />
                )}
              </Field>

              <Field name="email">
                {({ field }: any) => (
                  <Input {...field} type="email" placeholder="Email" />
                )}
              </Field>

              <Button
                type="submit"
                colorScheme="red"
                w="full"
                size="lg"
                isLoading={isSubmitting}
              >
                Request Booking
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>

      <Box h="1px" bg="gray.200" my={4} />
      
      <VStack spacing={2} fontSize="sm" color="gray.600">
        <Text>You won't be charged yet</Text>
        <HStack justify="space-between" w="full">
          <Text>Platform links:</Text>
        </HStack>
        <HStack spacing={2}>
          <Button size="xs" variant="outline">Booking.com</Button>
          <Button size="xs" variant="outline">Airbnb</Button>
          <Button size="xs" variant="outline">VRBO</Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default BookingForm