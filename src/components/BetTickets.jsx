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
  const [recordData, setRecordData] = useState();
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
