import { Button, FormControl, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Wallet = () => {
  return (
    <FormControl pos="absolute" right="-1065">
      <HStack>
        <Input
          type="number"
          size={4}
          w={24}
          borderRadius={'full'}
          placeholder="0.0"
          //   alignContent={'center'}
        />
        <Button bgColor={'green'} borderRadius={'full'} size={28}>
          <AiOutlinePlus color={'grey.500'} size={28} />
        </Button>
      </HStack>
    </FormControl>
  );
};

export default Wallet;
