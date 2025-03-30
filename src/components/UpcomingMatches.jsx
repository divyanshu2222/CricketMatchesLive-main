import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { fetchUpcomingMatches } from '../context/apiService';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    const getUpcomingMatches = async () => {
      try {
        const data = await fetchUpcomingMatches();
        setMatches(data.data); // Access the "data" array from the response
        setLoading(false);
      } catch (err) {
        console.error('Error fetching upcoming matches:', err);
        setError(true);
        setLoading(false);
      }
    };
    getUpcomingMatches();
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
  if (error)
    return <ErrorComponent message="Failed to load upcoming matches" />;

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" fontSize="2xl">
        🟢 Upcoming Matches
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
                  <VStack align="start" spacing={2}>
                    <Heading fontSize="lg" color="green.500">
                      {match.team_a} vs {match.team_b}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      Date: {new Date(match.match_date).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm">Time: {match.match_time}</Text>
                    <Text fontSize="sm">Venue: {match.venue}</Text>
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

export default UpcomingMatches;
