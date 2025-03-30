import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  FormControl,
  Input,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TiTicket } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

const BetCart = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { isOpen, onOpen, onClose } = useDisclosure(); // hook from chakra ui to open and close drawer menu anything start with use is a hook.
  const dispatch = useDispatch();

  const removeFromCartHandler = id => {
    dispatch({ type: 'removeFromCart', payload: id });
    dispatch({ type: 'calculatePrice' });
    toast.success('Removed from Cart');
  };

  return (
    <>
      <Button
        zIndex={'overlay'}
        pos={'fixed'}
        top={'4'}
        right={'20'}
        colorScheme="purple"
        p={'0'}
        w={'10'}
        h={'10'}
        borderRadius={'full'}
        onClick={onOpen}
      >
        <TiTicket size={'20'} />
        {cartItems.length > 0 && (
          <Text
            pos="absolute"
            top="-2"
            right="-2"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            bg="red"
            rounded="full"
            w="16px"
            h="16px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {cartItems.length}
          </Text>
        )}
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>BET SLIP</DrawerHeader>
          <DrawerBody>
            <VStack
              spacing={4}
              alignItems="stretch"
              w={'222px'}
              shadow={'lg'}
              p={'1'}
              borderRadius={'lg'}
              bg={'grey.500'}
              m={'4'}
              size={'50'}
              justifyContent={'space-between'}
            >
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </VStack>

            <HStack
              pos={'absolute'}
              bottom={'10'}
              left={'0'}
              w={'full'}
              justifyContent={'space-evenly'}
            >
              <Button onClick={onClose} colorScheme={'purple'}>
                <Link to="/login">Login</Link>
              </Button>
              <Button
                onClick={onClose}
                variant={'outline'}
                colorScheme={'purple'}
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const CartItem = ({ item, removeFromCartHandler }) => {
  const dispatch = useDispatch();
  const [betAmount, setBetAmount] = useState('');

  const calculateProfit = () => {
    if (betAmount && betAmount > 0) {
      return (betAmount * item.odds).toFixed(2);
    }
    return 0;
  };

  const placeBetHandler = () => {
    if (betAmount && betAmount > 0) {
      dispatch({
        type: 'placeBet',
        payload: {
          itemId: item.id,
          betAmount: Number(betAmount),
        },
      });
      setBetAmount('');
      dispatch({ type: 'calculatePrice' });
      toast.success('Bet placed successfully');
    } else {
      toast.error('Invalid bet amount');
    }
  };

  return (
    <>
      <HStack>
        <Text>{item.betType} -</Text>
        <Text>{item.odds}</Text>
        <AiFillDelete
          size={20}
          onClick={() => removeFromCartHandler(item.id)}
          color="red"
          cursor={'pointer'}
        />
      </HStack>
      <HStack>
        <Text color={'green'}>Profit: {calculateProfit()}₹</Text>
      </HStack>
      <HStack>
        <FormControl>
          <VStack>
            <Input
              type="number"
              placeholder="Enter Bet Amount"
              value={betAmount}
              onChange={e => setBetAmount(e.target.value)}
            />
            <Button
              type="submit"
              colorScheme={'purple'}
              // margin={'2'}
              onClick={placeBetHandler}
            >
              Place Bet
            </Button>
          </VStack>
        </FormControl>
      </HStack>
    </>
  );
};

export default BetCart;
