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

  // Convert overs string to decimal (7.3 overs → 7.5)
  const parseOvers = overs => {
    if (!overs) return 0;
    const [whole, part = 0] = overs.toString().split('.').map(Number);
    return whole + part / 6;
  };

  // Calculate CRR (exactly like Cricbuzz)
  const calculateCRR = (runs, overs) => {
    if (!runs || !overs) return '0.00';
    const runsNum = parseInt(runs.split('-')[0]);
    const oversDecimal = parseOvers(overs);
    if (oversDecimal === 0) return '0.00';
    return (runsNum / oversDecimal).toFixed(2);
  };

  // Calculate REQ (exactly like Cricbuzz)
  const calculateREQ = (target, currentRuns, currentOvers, totalOvers) => {
    if (!target || !currentRuns || !currentOvers || !totalOvers) return '0.00';

    const runsNeeded = target - parseInt(currentRuns.split('-')[0]);
    const remainingOvers = parseOvers(totalOvers) - parseOvers(currentOvers);

    if (remainingOvers <= 0) return '0.00';
    return (runsNeeded / remainingOvers).toFixed(2);
  };

  // Function to determine batting order based on toss
  const getBattingOrder = match => {
    if (!match.toss) {
      return {
        firstBattingTeam:
          match.current_inning === '2' ? match.team_b : match.team_a,
        secondBattingTeam:
          match.current_inning === '2' ? match.team_a : match.team_b,
      };
    }

    const tossParts = match.toss.split(' ');
    const tossWinner = tossParts[0];
    const tossDecision = tossParts[tossParts.length - 1];

    if (tossWinner === match.team_a) {
      return {
        firstBattingTeam: tossDecision === 'bat' ? match.team_a : match.team_b,
        secondBattingTeam: tossDecision === 'bat' ? match.team_b : match.team_a,
      };
    } else {
      return {
        firstBattingTeam: tossDecision === 'bat' ? match.team_b : match.team_a,
        secondBattingTeam: tossDecision === 'bat' ? match.team_a : match.team_b,
      };
    }
  };

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

                // Get batting order
                const { firstBattingTeam, secondBattingTeam } =
                  getBattingOrder(match);

                // Get scores and overs
                const firstInningScores =
                  firstBattingTeam === match.team_a
                    ? match.team_a_scores
                    : match.team_b_scores;
                const firstInningOvers =
                  firstBattingTeam === match.team_a
                    ? match.team_a_over
                    : match.team_b_over;
                const secondInningScores =
                  secondBattingTeam === match.team_a
                    ? match.team_a_scores
                    : match.team_b_scores;
                const secondInningOvers =
                  secondBattingTeam === match.team_a
                    ? match.team_a_over
                    : match.team_b_over;

                // Calculate rates
                const firstInningCRR = calculateCRR(
                  firstInningScores,
                  firstInningOvers
                );
                const secondInningCRR = calculateCRR(
                  secondInningScores,
                  secondInningOvers
                );
                const secondInningREQ = calculateREQ(
                  parseInt(firstInningScores?.split('-')[0]) + 1,
                  secondInningScores,
                  secondInningOvers,
                  match.total_overs || 20
                );

                return (
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
                      {/* Match header */}
                      <Box w="full">
                        <Heading fontSize="lg" color="green.500">
                          {match.team_a} vs {match.team_b}
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                          Venue: {match.venue}
                        </Text>
                        <Text fontSize="sm" color="gray.900">
                          {formattedDate} • {formattedTime}
                        </Text>
                      </Box>

                      {/* 1st Innings */}
                      <Box
                        bg="gray.100"
                        p={3}
                        borderRadius="md"
                        w="full"
                        _dark={{ bg: 'gray.600' }}
                      >
                        <Text fontWeight="bold">1st Innings:</Text>
                        <Text>
                          {firstBattingTeam}: {firstInningScores} (
                          {firstInningOvers} overs)
                        </Text>
                        <HStack fontSize="sm">
                          <Text>
                            Wickets: {firstInningScores?.split('-')[1] || '0'}
                          </Text>
                          <Text>• CRR: {firstInningCRR}</Text>
                        </HStack>
                      </Box>

                      {/* 2nd Innings */}
                      <Box
                        bg="gray.100"
                        p={3}
                        borderRadius="md"
                        w="full"
                        _dark={{ bg: 'gray.600' }}
                      >
                        <Text fontWeight="bold" color="blue.500">
                          {/* 2nd Innings: {secondBattingTeam} */}
                          2nd Innings:
                        </Text>
                        <Text>
                          {secondBattingTeam}: {secondInningScores} (
                          {secondInningOvers} overs)
                        </Text>
                        <HStack fontSize="sm">
                          <Text>
                            Wickets: {secondInningScores?.split('-')[1] || '0'}
                          </Text>
                          <Text>• CRR: {secondInningCRR}</Text>
                          {match.current_inning === '2' && (
                            <Text>• REQ: {secondInningREQ}</Text>
                          )}
                        </HStack>
                      </Box>
                      <Box>
                        {match.current_inning === '2' && (
                          <Text color="red.500" fontWeight="bold" mt={1}>
                            {match.need_run_ball}
                          </Text>
                        )}
                      </Box>
                      {match.toss && (
                        <Text color="gray.500">Toss: {match.toss}</Text>
                      )}
                      {/* Match footer */}
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
