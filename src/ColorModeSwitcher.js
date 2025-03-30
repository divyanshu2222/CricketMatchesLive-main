import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  // const text = useColorModeValue('dark', 'light');

  //SwitchIcon is a ternary operator that checks the color mode and returns the appropriate icon for the color mode.
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="ghost"
      color="current"
      pos={'fixed'}
      top={4} // 4 is 16px i.e. 1 unit = 4px
      right={4} // 4 is 16px i.e. 1 unit = 4px
      zIndex={'overlay'} // overlay is a z-index value that is used to make sure that the icon is always on top of other elements.
      onClick={toggleColorMode}
      icon={<SwitchIcon color="grey" />}
      {...props} // ...props is used to pass any other props that are passed to the component.
    />
  );
};
