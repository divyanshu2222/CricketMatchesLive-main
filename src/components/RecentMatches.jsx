import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { fetchRecentMatches } from '../context/apiService';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const RecentMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    const getRecentMatches = async () => {
      try {
        const data = await fetchRecentMatches();
        setMatches(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recent matches:', err);
        setError(true);
        setLoading(false);
      }
    };
    getRecentMatches();
  }, []);

  // Group matches by series
  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.series]) {
      acc[match.series] = [];
    }
    acc[match.series].push(match);
    return acc;
  }, {});

  if (loading) return <Loader />;
  if (error) return <ErrorComponent message="Failed to load recent matches" />;

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" fontSize="2xl">
        🟠 Recent Matches
      </Heading>

      {Object.keys(groupedMatches).map(series => (
        <Box key={series} mb={6}>
          <Button
            onClick={() =>
              setSelectedSeries(selectedSeries === series ? null : series)
            }
            colorScheme="teal"
            size="lg"
            mb={4}
          >
            {series}
          </Button>

          {selectedSeries === series && (
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {groupedMatches[series].map((match, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  bg="white"
                  _dark={{ bg: 'gray.700' }}
                >
                  <VStack align="start" spacing={3}>
                    {/* Match Title and Venue */}
                    <Box w="full">
                      <Heading fontSize="lg" color="orange.500">
                        {match.team_a} vs {match.team_b}
                      </Heading>
                      <Badge colorScheme="purple" mt={1}>
                        {match.venue}
                      </Badge>
                    </Box>

                    {/* Team A Score */}
                    <Box
                      w="full"
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                      _dark={{ bg: 'gray.600' }}
                    >
                      <Text fontWeight="bold">
                        {match.team_a}: {match.team_a_scores || 'N/A'}
                      </Text>
                      <HStack fontSize="sm">
                        <Text>Overs: {match.team_a_over || '-'}</Text>
                        <Text>•</Text>
                        <Text>
                          Wickets: {match.team_a_scores?.split('-')[1] || '0'}
                        </Text>
                      </HStack>
                    </Box>

                    {/* Team B Score */}
                    <Box
                      w="full"
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                      _dark={{ bg: 'gray.600' }}
                    >
                      <Text fontWeight="bold">
                        {match.team_b}: {match.team_b_scores || 'N/A'}
                      </Text>
                      <HStack fontSize="sm">
                        <Text>Overs: {match.team_b_over || '-'}</Text>
                        <Text>•</Text>
                        <Text>
                          Wickets: {match.team_b_scores?.split('-')[1] || '0'}
                        </Text>
                      </HStack>
                    </Box>

                    {/* Match Result and Date */}
                    <Box w="full" pt={2} borderTop="1px dashed">
                      <Text fontSize="sm" color="green.500" fontWeight="bold">
                        {match.result}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(match.match_date).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RecentMatches;
