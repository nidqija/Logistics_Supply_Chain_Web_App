// src/components/MapComponent.js
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Text,
  Tag,
  Card,
  CardBody,
  VStack,
  HStack
} from '@chakra-ui/react';

const MapComponent = ({ selectedRoute, sharedRoutes, onRouteSelect }) => {
  const mapRef = useRef(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [selectedAlternative, setSelectedAlternative] = useState(null);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = () => {
    console.log('Initializing map...');
  };

  useEffect(() => {
    if (selectedRoute) {
      const alternatives = [
        {
          id: 1,
          name: 'Fastest Route',
          duration: '45 min',
          distance: '25 miles',
          traffic: 'Light',
          tolls: false,
          coordinates: selectedRoute.coordinates
        },
        {
          id: 2,
          name: 'Scenic Route',
          duration: '55 min',
          distance: '28 miles',
          traffic: 'Moderate',
          tolls: false,
          coordinates: selectedRoute.coordinates
        },
        {
          id: 3,
          name: 'Eco Route',
          duration: '50 min',
          distance: '26 miles',
          traffic: 'Light',
          tolls: true,
          coordinates: selectedRoute.coordinates
        }
      ];
      setAlternativeRoutes(alternatives);
    }
  }, [selectedRoute]);

  const handleAlternativeSelect = (route) => {
    setSelectedAlternative(route);
  };

  const getTrafficColor = (traffic) => {
    switch (traffic) {
      case 'Light': return 'green';
      case 'Moderate': return 'orange';
      case 'Heavy': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Route Map
      </Text>
      
      {/* Map Container */}
      <Box 
        ref={mapRef}
        flex={1}
        bg="blue.50"
        border="1px"
        borderColor="blue.200"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Text color="gray.600">
          {selectedRoute 
            ? `Map showing: ${selectedRoute.name}`
            : 'Map Integration - Select a route to view details'
          }
        </Text>
      </Box>

      {/* Alternative Routes Selection */}
      {selectedRoute && alternativeRoutes.length > 0 && (
        <Box mt={4}>
          <FormControl>
            <FormLabel>Select Alternative Route</FormLabel>
            <Select
              value={selectedAlternative?.id || ''}
              onChange={(e) => {
                const route = alternativeRoutes.find(r => r.id === parseInt(e.target.value));
                handleAlternativeSelect(route);
              }}
              placeholder="Choose alternative route"
            >
              {alternativeRoutes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name} - {route.duration} • {route.distance} • {route.traffic}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Route Details */}
          {selectedAlternative && (
            <Card mt={4}>
              <CardBody>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {selectedAlternative.name}
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  <Tag colorScheme="blue" variant="outline">
                    Duration: {selectedAlternative.duration}
                  </Tag>
                  <Tag colorScheme="purple" variant="outline">
                    Distance: {selectedAlternative.distance}
                  </Tag>
                  <Tag colorScheme={getTrafficColor(selectedAlternative.traffic)}>
                    Traffic: {selectedAlternative.traffic}
                  </Tag>
                  {selectedAlternative.tolls && (
                    <Tag colorScheme="yellow">Toll Road</Tag>
                  )}
                </HStack>
              </CardBody>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MapComponent;