import React, { useEffect, useState } from 'react';
import BetData from '../context/BetData';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
} from '@chakra-ui/react';

import { TiTicket } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import { toast } from 'react-hot-toast';

const BetTickets = () => {
  const [recordData, setRecordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch(); // Here we are using the useDispatch hook to dispatch the addToCart action and calculatePrice action to the reducer function.
  const cartItems = useSelector(state => state.cart.cartItems);

  // Fetching data from an json file and storing it in state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = BetData;
        setRecordData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render error state or return null
  if (error) {
    return <ErrorComponent message={'Error While Fetching Odds'} />;
  }

  // This function is used to dispatch the addToCart action and calculatePrice action to the reducer function.
  const addToCartHandler = (id, betType, odds) => {
    const options = { id, betType, odds };
    dispatch({ type: 'addToCart', payload: options });
    dispatch({ type: 'calculatePrice' });
    toast.success('Added To Cart');
  };

  const removeFromCartHandler = id => {
    dispatch({ type: 'removeFromCart', payload: id });
    dispatch({ type: 'calculatePrice' });
    toast.success('Removed from Cart');
  };

  // Render the data
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        // parent accordion
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      All Bets Odds
                    </Box>
                    {isExpanded ? (
                      <BsArrowsAngleExpand fontSize="15px" />
                    ) : (
                      <BsArrowsAngleContract fontSize="15px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {/* child accordion - 1*/}
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Winning Team
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <HStack wrap={'wrap'}>
                        {recordData.tWin.map(item => (
                          <HStack key={item.id}>
                            <Button
                              key={item.id}
                              w={'222px'}
                              shadow={'lg'}
                              p={'1'}
                              borderRadius={'lg'}
                              bg={
                                cartItems.some(
                                  cartItem => cartItem.id === item.id
                                )
                                  ? 'red.500'
                                  : 'green.300'
                              }
                              m={'4'}
                              size={'50'}
                              justifyContent={'space-between'}
                              onClick={() =>
                                cartItems.some(
                                  cartItem => cartItem.id === item.id
                                )
                                  ? removeFromCartHandler(item.id)
                                  : addToCartHandler(
                                      item.id,
                                      item.betType,
                                      item.odds
                                    )
                              }
                            >
                              {item.betType} - {item.odds}
                              &nbsp;
                              {cartItems.some(
                                cartItem => cartItem.id === item.id
                              ) ? (
                                <AiFillDelete size={'25'} color="white" />
                              ) : (
                                <TiTicket
                                  color={'green'}
                                  size={'25'}
                                  bg={
                                    cartItems.some(
                                      cartItem => cartItem.id === item.id
                                    )
                                      ? 'red'
                                      : 'green'
                                  }
                                />
                              )}
                            </Button>
                          </HStack>
                        ))}
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                  {/* child accordion - 2*/}
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          Over Total Runs
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <HStack wrap={'wrap'}>
                        {recordData.t1Overs.map(over => (
                          <div key={over.name}>
                            {over.options.map(option => (
                              <HStack wrap={'wrap'} key={option.id}>
                                <Button
                                  key={option.id}
                                  w={'222px'}
                                  shadow={'lg'}
                                  p={'1'}
                                  borderRadius={'lg'}
                                  bg={
                                    cartItems.some(
                                      cartItem => cartItem.id === option.id
                                    )
                                      ? 'red.500'
                                      : 'green.300'
                                  }
                                  m={'3'}
                                  size={'50'}
                                  justifyContent={'space-between'}
                                  onClick={() =>
                                    cartItems.some(
                                      cartItem => cartItem.id === option.id
                                    )
                                      ? removeFromCartHandler(option.id)
                                      : addToCartHandler(
                                          option.id,
                                          option.betType,
                                          option.odds
                                        )
                                  }
                                >
                                  {option.betType} - {option.odds}
                                  &nbsp;
                                  {cartItems.some(
                                    cartItem => cartItem.id === option.id
                                  ) ? (
                                    <AiFillDelete size={'25'} color="white" />
                                  ) : (
                                    <TiTicket
                                      color={'green'}
                                      size={'25'}
                                      bg={
                                        cartItems.some(
                                          cartItem => cartItem.id === option.id
                                        )
                                          ? 'red'
                                          : 'green'
                                      }
                                    />
                                  )}
                                </Button>
                              </HStack>
                            ))}
                          </div>
                        ))}
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default BetTickets;

// BetTickets.js
// import React, { useEffect, useState } from 'react';
// import {
//   Accordion,
//   AccordionButton,
//   AccordionIcon,
//   AccordionItem,
//   AccordionPanel,
//   Box,
//   Button,
//   HStack,
// } from '@chakra-ui/react';
// import { TiTicket } from 'react-icons/ti';
// import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
// import { toast } from 'react-hot-toast';
// import { login, fetchMatchData, fetchBetOdds } from '../context/apiService';
// import Loader from './Loader';
// import ErrorComponent from './ErrorComponent';

// const BetTickets = () => {
//   const [matches, setMatches] = useState([]);
//   const [odds, setOdds] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [token, setToken] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userToken = await login('C 320302', 'YbpQvIDz');
//         setToken(userToken);
//         const matchData = await fetchMatchData(userToken);
//         setMatches(matchData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchOdds = async matchId => {
//     try {
//       const matchOdds = await fetchBetOdds(token, matchId);
//       setOdds(prevOdds => ({ ...prevOdds, [matchId]: matchOdds }));
//     } catch (error) {
//       console.error('Error fetching odds:', error);
//       setError(true);
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <ErrorComponent message="Error While Fetching Data" />;

//   return (
//     <Accordion defaultIndex={[0]} allowMultiple>
//       <AccordionItem>
//         {({ isExpanded }) => (
//           <>
//             <h2>
//               <AccordionButton>
//                 <Box as="span" flex="1" textAlign="left">
//                   All Cricket Matches
//                 </Box>
//                 {isExpanded ? (
//                   <BsArrowsAngleExpand fontSize="15px" />
//                 ) : (
//                   <BsArrowsAngleContract fontSize="15px" />
//                 )}
//               </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//               {matches.map(match => (
//                 <AccordionItem key={match.id}>
//                   <h2>
//                     <AccordionButton onClick={() => fetchOdds(match.id)}>
//                       <Box as="span" flex="1" textAlign="left">
//                         {match.name}
//                       </Box>
//                       <AccordionIcon />
//                     </AccordionButton>
//                   </h2>
//                   <AccordionPanel pb={4}>
//                     {odds[match.id] ? (
//                       <>
//                         <h3>Winning Team Odds</h3>
//                         <HStack wrap={'wrap'}>
//                           {odds[match.id].tWin.map(item => (
//                             <Button key={item.id}>
//                               {item.betType} - {item.odds}
//                               <TiTicket color={'green'} size={'25'} />
//                             </Button>
//                           ))}
//                         </HStack>
//                         <h3>Over Total Runs Odds</h3>
//                         <HStack wrap={'wrap'}>
//                           {odds[match.id].t1Overs.map(over =>
//                             over.options.map(option => (
//                               <Button key={option.id}>
//                                 {option.betType} - {option.odds}
//                                 <TiTicket color={'green'} size={'25'} />
//                               </Button>
//                             ))
//                           )}
//                         </HStack>
//                       </>
//                     ) : (
//                       <p>Loading odds...</p>
//                     )}
//                   </AccordionPanel>
//                 </AccordionItem>
//               ))}
//             </AccordionPanel>
//           </>
//         )}
//       </AccordionItem>
//     </Accordion>
//   );
// };

// export default BetTickets;
