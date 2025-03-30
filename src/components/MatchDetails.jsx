import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLiveMatches } from '../context/apiService';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMatchDetails = async () => {
      try {
        const { data } = await fetchLiveMatches();
        const foundMatch = data.find(m => m.match_id.toString() === matchId);
        setMatch(foundMatch);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching match details:', err);
        setError(true);
        setLoading(false);
      }
    };
    getMatchDetails();
  }, [matchId]);

  if (loading) return <Loader />;
  if (error) return <ErrorComponent message="Failed to load match details" />;
  if (!match) return <ErrorComponent message="Match not found" />;

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center">
        {match.team_a} vs {match.team_b}
      </Heading>

      <VStack spacing={6} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>
            T1: {match.team_a}{' '}
            <Text>Score: {match.team_a_scores || 'Not available'}</Text>
          </Heading>
          <Heading size="md" mb={4}>
            T2: {match.team_b}
            <Text>Score: {match.team_b_scores || 'Not available'}</Text>
          </Heading>
          <Text fontWeight="bold">🔴 {match.match_status}</Text>
          <Text>{match.series}</Text>
          <Text>Match Type: {match.match_type}</Text>
          {match.toss && <Text>Toss: {match.toss}</Text>}
        </Box>
      </VStack>
    </Box>
  );
};

export default MatchDetails;
