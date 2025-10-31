import React from 'react';
import {
  Box,
  Flex,
  Text,
  Tabs,
  TabList,
  Tab,
  Badge,
  HStack,
  Icon
} from '@chakra-ui/react';

const Header = ({ currentView, onViewChange, unreadAlerts }) => {
  const handleTabChange = (index) => {
    const views = ['map', 'community', 'alerts'];
    onViewChange(views[index]);
  };

  const getTabIndex = () => {
    const views = ['map', 'community', 'alerts'];
    return views.indexOf(currentView);
  };

  return (
    <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
      <Flex 
        justify="space-between" 
        align="center" 
        px={{ base: 4, lg: 8 }} 
        py={4}
        maxW="container.xl"
        mx="auto"
      >
        <HStack spacing={3}>
          <Icon viewBox="0 0 24 24" color="blue.600" boxSize={6}>
            <path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </Icon>
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            RouteRater
          </Text>
        </HStack>
        
        <Tabs 
          index={getTabIndex()} 
          onChange={handleTabChange}
          variant="enclosed"
          colorScheme="blue"
        >
          <TabList>
            <Tab>
              <HStack spacing={2}>
                <Text>Map</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Text>Community</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Text>Alerts</Text>
                {unreadAlerts > 0 && (
                  <Badge colorScheme="red" borderRadius="full" px={2}>
                    {unreadAlerts}
                  </Badge>
                )}
              </HStack>
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default Header;