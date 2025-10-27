import React, { useState } from 'react';
import {
  Box,
  Text,
  Card,
  CardBody,
  Button,
  Textarea,
  Grid,
  Tag,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  SimpleGrid,
  Stack,
  Divider
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, StarIcon } from '@chakra-ui/icons';

const CommunityRoutes = ({ sharedRoutes, onRouteSelect, onShareRoute }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = 6;

  const [newRoute, setNewRoute] = useState({
    name: '',
    area: '',
    distance: '',
    description: ''
  });

  const areas = [...new Set(sharedRoutes.map(route => route.area))];

  const filteredRoutes = sharedRoutes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !areaFilter || route.area === areaFilter;
    const matchesRating = route.rating >= ratingFilter;
    
    return matchesSearch && matchesArea && matchesRating;
  });

  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);
  const totalPages = Math.ceil(filteredRoutes.length / routesPerPage);

  const handleShareRoute = () => {
    if (!newRoute.name || !newRoute.area || !newRoute.distance) {
      alert('Please fill in all required fields');
      return;
    }

    onShareRoute(newRoute);
    setNewRoute({
      name: '',
      area: '',
      distance: '',
      description: ''
    });
    onClose();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setAreaFilter('');
    setRatingFilter(0);
    setCurrentPage(1);
  };

  const StarRating = ({ rating }) => {
    return (
      <HStack spacing={0.5}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            color={star <= rating ? "yellow.400" : "gray.300"}
            w={4}
            h={4}
          />
        ))}
      </HStack>
    );
  };

  return (
    <Box>
      {/* Header and Actions */}
      <HStack justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Community Shared Routes
        </Text>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={onOpen}
        >
          Share Route
        </Button>
      </HStack>

      {/* Search and Filters */}
      <Card mb={6}>
        <CardBody>
          <Stack direction={{ base: "column", md: "row" }} spacing={4} align="flex-end">
            <FormControl>
              <FormLabel>Search Routes</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Area</FormLabel>
              <Select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                placeholder="All Areas"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Min Rating</FormLabel>
              <HStack spacing={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    color={star <= ratingFilter ? "yellow.400" : "gray.300"}
                    w={5}
                    h={5}
                    cursor="pointer"
                    onClick={() => setRatingFilter(star)}
                  />
                ))}
              </HStack>
            </FormControl>

            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </Stack>
        </CardBody>
      </Card>

      {/* Routes Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {currentRoutes.map((route) => (
          <Card 
            key={route.id}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: 'lg'
            }}
            onClick={() => onRouteSelect(route)}
          >
            <CardBody>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between" align="flex-start">
                  <Text fontWeight="bold" fontSize="lg" flex={1}>
                    {route.name}
                  </Text>
                  <Tag colorScheme="blue" variant="outline">
                    {route.area}
                  </Tag>
                </HStack>
                
                <Text color="gray.600" fontSize="sm">
                  {route.description}
                </Text>

                <Divider />

                <HStack justify="space-between">
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="bold" fontSize="md">
                      {route.distance}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Distance
                    </Text>
                  </VStack>
                  
                  <VStack align="center" spacing={0}>
                    <StarRating rating={route.rating} />
                    <Text fontSize="xs" color="gray.600">
                      {route.rating.toFixed(1)} stars
                    </Text>
                  </VStack>

                  <VStack align="flex-end" spacing={0}>
                    <Text fontWeight="bold" fontSize="md">
                      {route.ratingsCount || 0}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Ratings
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* No Results */}
      {currentRoutes.length === 0 && (
        <Text textAlign="center" color="gray.600" py={8}>
          No routes found matching your criteria.
        </Text>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <HStack justify="center" mt={6} spacing={2}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              colorScheme={currentPage === page ? "blue" : "gray"}
              variant={currentPage === page ? "solid" : "outline"}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </HStack>
      )}

      {/* Share Route Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Your Route</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Route Name</FormLabel>
                <Input
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                  placeholder="Enter route name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Area</FormLabel>
                <Select
                  value={newRoute.area}
                  onChange={(e) => setNewRoute({...newRoute, area: e.target.value})}
                  placeholder="Select area"
                >
                  <option value="West Coast">West Coast</option>
                  <option value="East Coast">East Coast</option>
                  <option value="Rocky Mountains">Rocky Mountains</option>
                  <option value="Midwest">Midwest</option>
                  <option value="South">South</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Distance</FormLabel>
                <Input
                  value={newRoute.distance}
                  onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})}
                  placeholder="e.g., 45 miles"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Route Description</FormLabel>
                <Textarea
                  value={newRoute.description}
                  onChange={(e) => setNewRoute({...newRoute, description: e.target.value})}
                  placeholder="Describe your route..."
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleShareRoute}>
              Share Route
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommunityRoutes;