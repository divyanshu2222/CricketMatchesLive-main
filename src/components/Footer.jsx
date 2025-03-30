import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} minH={'40'} p="16" color={'white'}>
      <Stack direction={['column', 'row']}>
        {/*  VStack is used to stack the elements vertically and align them by default to the center*/}
        {/*VStack 1*/}
        <VStack alignItems={'stretch'} w={'full'} px={'4'}>
          {/* VStack internally divided into 3 parts and each part is a HStack */}
          <Heading
            size="md"
            textTransform={'uppercase'}
            textAlign={['left', 'center']}
          >
            Subscribe to get updates
          </Heading>

          {/*  HStack is used to stack the elements horizontally and align them by default to the center*/}
          <HStack borderBottom={'2px solid white'} py={'2'}>
            {/*  borderbottom is used to get the line below the input field and 
            py is used to get the padding on the y axis in the input field*/}
            <Input
              placeholder="Enter Email Here..."
              border={'none'}
              borderRadius={'none'}
              outline={'none'}
              focusBorderColor="none"
            />
            <Button
              p={'0'}
              colorScheme={'purple'}
              variant={'ghost'}
              borderRadius={'0 20px 20px 0'}
            >
              {/*AiOutlineSend is used to get the send icon from react-icons*/}
              <AiOutlineSend size={20} />
            </Button>
          </HStack>
        </VStack>

        {/*VStack 2*/}
        <VStack
          w={'full'}
          borderLeft={('none', '1px solid white')}
          borderRight={('none', '1px solid white')}
        >
          <Heading textTransform={'uppercase'} textAlign={'center'}>
            BET APP
          </Heading>
          <Text>&copy;All rights reserved.</Text>
        </VStack>

        {/*VStack 3*/}
        <VStack w={'full'}>
          <Heading size={'md'} textTransform={'uppercase'}>
            Social Media
          </Heading>
          <Button target="blank" variant={'link'} colorScheme={'whiteAlpha'}>
            <a href="https://youtube.com">Youtube</a>
          </Button>
          <Button target="blank" variant={'link'} colorScheme={'whiteAlpha'}>
            <a href="https://instagram.com">Instagram</a>
          </Button>
          <Button target="blank" variant={'link'} colorScheme={'whiteAlpha'}>
            <a href="https://github.com">Github</a>
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
