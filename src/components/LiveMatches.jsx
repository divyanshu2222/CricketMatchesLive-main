import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
} from '@chakra-ui/react';
import { fetchLiveMatches } from '../context/apiService';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    const getLiveMatches = async () => {
      try {
        const data = await fetchLiveMatches();
        setMatches(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching live matches:', err);
        setError(true);
        setLoading(false);
      }
    };
    getLiveMatches();
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
  if (error) return <ErrorComponent message="Failed to load live matches" />;

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" fontSize="2xl">
        🔴 Live Matches
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
              {groupedMatches[series].map((match, index) => {
                const matchDate = new Date(match.match_date);
                const formattedDate = matchDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });
                const formattedTime = match.match_time || 'Time not available';

                return (
                  // <Box
                  //   key={index}
                  //   p={4}
                  //   borderWidth="1px"
                  //   borderRadius="lg"
                  //   boxShadow="md"
                  //   bg="white"
                  //   _dark={{ bg: 'gray.700' }}
                  // >

                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    bg="white"
                    _dark={{ bg: 'gray.700' }}
                    as={Link}
                    to={`/match/${match.match_id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <VStack align="start" spacing={3}>
                      {/* Match header with date/time */}
                      <Box w="full">
                        <Heading fontSize="lg" color="red.500">
                          {match.team_a} vs {match.team_b}
                        </Heading>
                        <HStack mt={1} spacing={2}>
                          <Text fontSize="sm" color="gray.500">
                            Venue: {match.venue}
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontSize="sm" color="gray.900">
                            {formattedDate} • {formattedTime}
                          </Text>
                        </HStack>
                      </Box>

                      {/* 1st Inning Score */}
                      <Box
                        w="full"
                        bg="gray.100"
                        p={3}
                        borderRadius="md"
                        _dark={{ bg: 'gray.600' }}
                      >
                        <Text fontWeight="bold">1st Innings:</Text>
                        {match.current_inning === '2' ? (
                          <>
                            <Text>
                              {match.team_b}: {match.team_b_scores} (
                              {match.team_b_over} overs)
                            </Text>
                            <HStack fontSize="sm">
                              <Text>
                                Wickets:{' '}
                                {match.team_b_scores?.split('-')[1] || '0'}
                              </Text>
                            </HStack>
                          </>
                        ) : (
                          <>
                            <Text>
                              {match.team_a}: {match.team_a_scores} (
                              {match.team_a_over} overs)
                            </Text>
                            <HStack fontSize="sm">
                              <Text>
                                Wickets:{' '}
                                {match.team_a_scores?.split('-')[1] || '0'}
                              </Text>
                            </HStack>
                          </>
                        )}
                      </Box>

                      {/* Current Inning */}
                      <Box w="full">
                        <Text fontWeight="bold" color="blue.500">
                          Current:{' '}
                          {match.current_inning === '2'
                            ? match.team_a
                            : match.team_b}
                        </Text>
                        <Text>
                          {match.current_inning === '2' ? (
                            <>
                              {match.team_a}: {match.team_a_scores} (
                              {match.team_a_over} overs)
                            </>
                          ) : (
                            <>
                              {match.team_b}: {match.team_b_scores} (
                              {match.team_b_over} overs)
                            </>
                          )}
                        </Text>
                        {match.current_inning === '2' && (
                          <Text color="red.500" fontWeight="bold" mt={1}>
                            {match.need_run_ball}
                          </Text>
                        )}
                      </Box>
                      {match.toss && (
                        <Text color="gray.500"> {match.toss}</Text>
                      )}
                      {/* Match status */}
                      <Box w="full" pt={2} borderTop="1px dashed">
                        <HStack justify="space-between">
                          <Text fontSize="sm" color="green.500">
                            🔴 {match.match_status}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {match.match_type}
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default LiveMatches;
