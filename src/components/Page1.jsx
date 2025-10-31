// src/App.js
import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Grid,
  GridItem,
  useColorMode,
  extendTheme
} from '@chakra-ui/react';
import Header from '../components/Header';
import MapComponent from '../components/MapComponent';
import RatingSystem from '../components/RatingSystem';
import AlertSystem from '../components/AlertSystem';
import CommunityRoutes from '../components/CommunityRoutes';
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
    }
  }
});

function Page1() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [alerts, setAlerts] = useLocalStorage('alerts', []);
  const [ratings, setRatings] = useLocalStorage('routeRatings', []);
  const [sharedRoutes, setSharedRoutes] = useLocalStorage('sharedRoutes', []);
  const [currentView, setCurrentView] = useState('map');

  useEffect(() => {
    if (sharedRoutes.length === 0) {
      const sampleRoutes = [
        {
          id: 1,
          name: 'Scenic Coastal Route',
          area: 'West Coast',
          distance: '45 miles',
          rating: 4.5,
          description: 'Beautiful coastal views with minimal traffic',
          coordinates: [[-122.5, 37.7], [-122.4, 37.8], [-122.3, 37.9]]
        },
        {
          id: 2,
          name: 'Mountain Pass Express',
          area: 'Rocky Mountains',
          distance: '120 miles',
          rating: 4.2,
          description: 'Quick mountain pass with stunning vistas',
          coordinates: [[-105.5, 39.7], [-105.3, 39.8], [-105.1, 39.9]]
        }
      ];
      setSharedRoutes(sampleRoutes);
    }
  }, [sharedRoutes.length, setSharedRoutes]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentView('map');
  };

  const handleAddRating = (ratingData) => {
    const newRating = {
      id: Date.now(),
      ...ratingData,
      timestamp: new Date().toISOString()
    };
    setRatings([...ratings, newRating]);
  };

  const handleShareRoute = (routeData) => {
    const newRoute = {
      id: Date.now(),
      ...routeData,
      timestamp: new Date().toISOString(),
      rating: 0,
      ratingsCount: 0
    };
    setSharedRoutes([...sharedRoutes, newRoute]);
  };

  const handleAddAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      ...alertData,
      timestamp: new Date().toISOString(),
      read: false
    };
    setAlerts([newAlert, ...alerts]);
  };

  const markAlertAsRead = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
          unreadAlerts={alerts.filter(alert => !alert.read).length}
        />
        
        <Container maxW="container.xl" mt={4}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            {/* Main Content Area */}
            <GridItem>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md" height="600px">
                {currentView === 'map' && (
                  <MapComponent
                    selectedRoute={selectedRoute}
                    sharedRoutes={sharedRoutes}
                    onRouteSelect={setSelectedRoute}
                  />
                )}
                {currentView === 'community' && (
                  <CommunityRoutes
                    sharedRoutes={sharedRoutes}
                    onRouteSelect={handleRouteSelect}
                    onShareRoute={handleShareRoute}
                  />
                )}
                {currentView === 'alerts' && (
                  <AlertSystem
                    alerts={alerts}
                    onAddAlert={handleAddAlert}
                    onMarkAsRead={markAlertAsRead}
                  />
                )}
              </Box>
            </GridItem>

            {/* Sidebar */}
            <GridItem>
              <Grid templateRows="auto auto" gap={6}>
                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                  <RatingSystem
                    selectedRoute={selectedRoute}
                    onAddRating={handleAddRating}
                    ratings={ratings}
                  />
                </Box>
                
                <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                  {/* Quick actions can be added here */}
                </Box>
              </Grid>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default Page1;