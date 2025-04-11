import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLiveMatches } from '../context/apiService';
import { Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import BetTickets from './BetTickets';

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

  // Determine batting order based on toss
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
  if (error) return <ErrorComponent message="Failed to load match details" />;
  if (!match) return <ErrorComponent message="Match not found" />;

  // Get batting order and scores
  const { firstBattingTeam, secondBattingTeam } = getBattingOrder(match);
  const firstInningScores =
    firstBattingTeam === match.team_a
      ? match.team_a_scores
      : match.team_b_scores;
  const firstInningOvers =
    firstBattingTeam === match.team_a ? match.team_a_over : match.team_b_over;
  const secondInningScores =
    secondBattingTeam === match.team_a
      ? match.team_a_scores
      : match.team_b_scores;
  const secondInningOvers =
    secondBattingTeam === match.team_a ? match.team_a_over : match.team_b_over;

  // Calculate rates
  const firstInningCRR = calculateCRR(firstInningScores, firstInningOvers);
  const secondInningCRR = calculateCRR(secondInningScores, secondInningOvers);
  const secondInningREQ = calculateREQ(
    parseInt(firstInningScores?.split('-')[0]) + 1,
    secondInningScores,
    secondInningOvers,
    match.total_overs || 20
  );

  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center">
        {match.team_a} vs {match.team_b}
      </Heading>

      <VStack spacing={6} align="stretch">
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          {/* 1st Innings */}
          <Heading size="md" mb={2}>
            1st Innings: {firstBattingTeam}
          </Heading>
          <HStack>
            <Text>Score: {firstInningScores || 'Not available'}</Text>
            <Text>Overs: {firstInningOvers || '0'}</Text>
          </HStack>
          <Text>CRR: {firstInningCRR}</Text>

          {/* 2nd Innings */}
          <Heading size="md" mt={4} mb={2}>
            2nd Innings: {secondBattingTeam}
          </Heading>
          <HStack>
            <Text>Score: {secondInningScores || 'Not available'}</Text>
            <Text>Overs: {secondInningOvers || '0'}</Text>
          </HStack>
          <Text>CRR: {secondInningCRR}</Text>
          {match.current_inning === '2' && <Text>REQ: {secondInningREQ}</Text>}

          {/* Match Info */}
          <Box mt={4} pt={4} borderTop="1px dashed">
            <Text fontWeight="bold">🔴 {match.match_status}</Text>
            {/* <Text>{match.series}</Text> */}
            <Text>Match Type: {match.match_type}</Text>
            {match.toss && <Text>Toss: {match.toss}</Text>}
            {/* <Text>Venue: {match.venue}</Text> */}
          </Box>
        </Box>

        <Box>
          <BetTickets />
        </Box>
      </VStack>
    </Box>
  );
};

export default MatchDetails;
