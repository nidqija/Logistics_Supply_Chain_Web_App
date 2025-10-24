import { Box, Button, Heading, VStack , Text , useColorMode } from "@chakra-ui/react";


export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === "light" ? "gray.100" : "gray.900"} color={colorMode === "light" ? "black" : "white"} p={10}>
      <VStack spacing={6}>
        <Heading>Welcome to Chakra UI ⚡</Heading>
        <Text fontSize="lg">This is a modern UI library for React.</Text>
        <Button colorScheme="teal" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Button colorScheme="purple">Click Me</Button>
      </VStack>
    </Box>
  );
}