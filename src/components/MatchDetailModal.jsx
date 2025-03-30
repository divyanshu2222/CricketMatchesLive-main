import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
} from '@chakra-ui/react';

const MatchDetailModal = ({ isOpen, onClose, match }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {match.team_a} vs {match.team_b}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {/* Team 1 Score */}
            <Box
              bg="gray.100"
              p={3}
              borderRadius="md"
              _dark={{ bg: 'gray.600' }}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">T1: {match.team_a}</Text>
                <Badge colorScheme="green" fontSize="md">
                  {match.team_a_scores || '0/0'}
                </Badge>
              </HStack>
              {match.team_a_over && (
                <Text fontSize="sm" color="gray.500">
                  Overs: {match.team_a_over}
                </Text>
              )}
            </Box>

            {/* Team 2 Score */}
            <Box
              bg="gray.100"
              p={3}
              borderRadius="md"
              _dark={{ bg: 'gray.600' }}
            >
              <HStack justify="space-between">
                <Text fontWeight="bold">T2: {match.team_b}</Text>
                <Badge colorScheme="green" fontSize="md">
                  {match.team_b_scores || '0/0'}
                </Badge>
              </HStack>
              {match.team_b_over && (
                <Text fontSize="sm" color="gray.500">
                  Overs: {match.team_b_over}
                </Text>
              )}
            </Box>

            {/* Match Status */}
            <Text textAlign="center" fontWeight="bold" color="blue.500">
              {match.match_status}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MatchDetailModal;
