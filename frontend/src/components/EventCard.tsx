import { useTranslation } from 'react-i18next'
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import type { EventData } from '../data/events'

interface EventCardProps {
  event: EventData
}

const EventCard = ({ event }: EventCardProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      className="card"
      bg={event.gradient}
      color="white"
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      p={5}
    >
      {/* Content layer - above emoji */}
      <Box position="relative" zIndex={2}>
        <Text
          fontWeight="bold"
          fontSize="1.25rem"
          mb={2}
          color="white"
          textShadow="1px 1px 2px rgba(0,0,0,0.3)"
        >
          {t(`events.${event.id}.title`)}
        </Text>

        {event.hasSubtitle && (
          <Text
            fontSize="0.9rem"
            mb={2}
            color="#ffd700"
            textShadow="1px 1px 2px rgba(0,0,0,0.3)"
            fontWeight="bold"
          >
            {t(`events.${event.id}.subtitle`)}
          </Text>
        )}

        <Text
          fontSize="0.9rem"
          mb={2}
          color="white"
          textShadow="1px 1px 2px rgba(0,0,0,0.3)"
        >
          {t(`events.${event.id}.date`)}
        </Text>

        <Text
          fontSize="0.85rem"
          mb={2}
          color="white"
          textShadow="1px 1px 2px rgba(0,0,0,0.3)"
        >
          {t(`events.${event.id}.location`)}
        </Text>

        {event.hasDetails && (
          <Text
            fontSize="0.8rem"
            mb={4}
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,0.3)"
          >
            {t(`events.${event.id}.details`)}
          </Text>
        )}

        <Box display="flex" gap="8px">
          <Button
            onClick={() => window.open(event.url, '_blank')}
            bg="#FF385C"
            color="white"
            border="none"
            px={4}
            py={2}
            borderRadius="6px"
            cursor="pointer"
            fontSize="14px"
            fontWeight="bold"
            _hover={{ bg: '#e0314f' }}
          >
            {t(`events.${event.id}.button`)}
          </Button>

          {event.modal && (
            <Button
              onClick={onOpen}
              bg="rgba(255,255,255,0.2)"
              color="white"
              border="1px solid white"
              px={4}
              py={2}
              borderRadius="6px"
              cursor="pointer"
              fontSize="14px"
              fontWeight="bold"
              _hover={{ bg: 'rgba(255,255,255,0.3)' }}
            >
              {t(`events.${event.id}.secondaryButton`)}
            </Button>
          )}
        </Box>
      </Box>

      {/* Emoji decoration */}
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        fontSize="4rem"
        opacity={0.15}
        zIndex={1}
      >
        {event.emoji}
      </Box>

      {/* Modal for secondary content - portals out of the DOM tree */}
      {event.modal && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="12px" p={2}>
            <ModalHeader color="#FF385C">
              {t(`events.${event.id}.modal.title`)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>{t(`events.${event.id}.modal.content`)}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}

export default EventCard
