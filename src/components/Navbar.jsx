import { Box, Flex, HStack, Link, Button, Text, useColorModeValue } from "@chakra-ui/react";

function Navbar() {
  return (
   <Box>
      <Flex>
         <HStack spacing={10}>
            <NavLink href="/signup">Sign Up</NavLink>
            <NavLink href="/signup">Home</NavLink>
            <NavLink href="/inventory">Inventory</NavLink>
         </HStack>
      </Flex>
   </Box>
  );
}

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    fontWeight="medium"
    _hover={{
      textDecoration: "none",
      color: "blue.500",
    }}
  >
    {children}
  </Link>
);

export default Navbar;
