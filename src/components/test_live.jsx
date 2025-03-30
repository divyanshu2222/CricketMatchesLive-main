// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Text,
//   VStack,
//   Button,
//   HStack,
// } from '@chakra-ui/react';
// import { fetchLiveMatches } from '../context/apiService';
// import Loader from './Loader';
// import ErrorComponent from './ErrorComponent';
// import { useDisclosure } from '@chakra-ui/react';
// import MatchDetailModal from './MatchDetailModal';

// const LiveMatches = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [selectedSeries, setSelectedSeries] = useState(null);

//   // Inside the LiveMatches component, add this state:
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   useEffect(() => {
//     const getLiveMatches = async () => {
//       try {
//         const data = await fetchLiveMatches();
//         setMatches(data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching live matches:', err);
//         setError(true);
//         setLoading(false);
//       }
//     };
//     getLiveMatches();
//   }, []);

//   // Group matches by series
//   const groupedMatches = matches.reduce((acc, match) => {
//     if (!acc[match.series]) {
//       acc[match.series] = [];
//     }
//     acc[match.series].push(match);
//     return acc;
//   }, {});

//   if (loading) return <Loader />;
//   if (error) return <ErrorComponent message="Failed to load live matches" />;

//   return (
//     <Box p={4}>
//       <Heading mb={6} textAlign="center" fontSize="2xl">
//         🔴 Live Matches
//       </Heading>

//       {Object.keys(groupedMatches).map(series => (
//         <Box key={series} mb={6}>
//           <Button
//             onClick={() =>
//               setSelectedSeries(selectedSeries === series ? null : series)
//             }
//             colorScheme="teal"
//             size="lg"
//             mb={4}
//           >
//             {series}
//           </Button>

//           {selectedSeries === series && (
//             <SimpleGrid columns={[1, 2, 3]} spacing={4}>
//               {groupedMatches[series].map((match, index) => {
//                 const matchDate = new Date(match.match_date);
//                 const formattedDate = matchDate.toLocaleDateString('en-US', {
//                   weekday: 'short',
//                   month: 'short',
//                   day: 'numeric',
//                 });
//                 const formattedTime = match.match_time || 'Time not available';

//                 return (
//                   <Box
//                     key={index}
//                     p={4}
//                     borderWidth="1px"
//                     borderRadius="lg"
//                     boxShadow="md"
//                     bg="white"
//                     _dark={{ bg: 'gray.700' }}
//                     cursor="pointer" // Add this
//                     onClick={() => {
//                       setSelectedMatch(match);
//                       onOpen();
//                     }} // Add this
//                   >
//                  {/* paste code here */}
//       {/* Match Detail Modal */}
//       {selectedMatch && (
//         <MatchDetailModal
//           isOpen={isOpen}
//           onClose={onClose}
//           match={selectedMatch}
//         />
//       )}
//     </Box>
//   );
// };

// export default LiveMatches;
