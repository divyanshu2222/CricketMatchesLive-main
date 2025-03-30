import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import BetCart from './BetCart';
import Wallet from './Wallet';

const Header = () => {
  return (
    <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
      <Button variant={'unstyled'} color={'white'}>
        <Link to={'/'}>Home</Link>
      </Button>

      {/* Matches Dropdown */}
      <Menu>
        <MenuButton as={Button} colorScheme="purple">
          Matches
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/live-matches">
            Live Matches
          </MenuItem>
          <MenuItem as={Link} to="/upcoming-matches">
            Upcoming Matches
          </MenuItem>
          <MenuItem as={Link} to="/recent-matches">
            Recent Matches
          </MenuItem>
        </MenuList>
      </Menu>

      <Button variant={'unstyled'} color={'white'}>
        <Link to={'/coins'}>
          <CgProfile size={22} />
        </Link>
      </Button>
      <Wallet />
      <BetCart />
    </HStack>
  );
};

export default Header;
