import React, { useState } from 'react';
import {
  Box,
  Text,
  Textarea,
  Button,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  Divider,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const RatingSystem = ({ selectedRoute, onAddRating, ratings }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(-1);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const ratingData = {
      routeId: selectedRoute?.id,
      routeName: selectedRoute?.name,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };

    onAddRating(ratingData);
    setRating(0);
    setComment('');
    
    toast({
      title: "Rating submitted!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const routeRatings = ratings.filter(r => r.routeId === selectedRoute?.id);

  return (
    <Box>
      {!selectedRoute ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Please select a route from the map or community section to rate it.
        </Alert>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Rate: {selectedRoute.name}
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text mb={2}>Your Rating</Text>
                <HStack spacing={1}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      color={star <= (hover !== -1 ? hover : rating) ? "yellow.400" : "gray.300"}
                      w={6}
                      h={6}
                      cursor="pointer"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(-1)}
                      transition="color 0.2s"
                    />
                  ))}
                </HStack>
              </Box>

              <Textarea
                placeholder="Share your experience with this route (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                size="md"
                resize="vertical"
              />

              <Button 
                type="submit" 
                colorScheme="blue"
                isDisabled={rating === 0}
                width="full"
              >
                Submit Rating
              </Button>
            </VStack>
          </form>

          {/* Previous Ratings */}
          {routeRatings.length > 0 && (
            <Box mt={6}>
              <Divider mb={4} />
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                Community Ratings
              </Text>
              <VStack spacing={3} align="stretch">
                {routeRatings.slice(0, 3).map((ratingItem) => (
                  <Card key={ratingItem.id} variant="outline">
                    <CardBody py={2}>
                      <HStack justify="space-between" align="center" mb={1}>
                        <HStack spacing={1}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              color={star <= ratingItem.rating ? "yellow.400" : "gray.300"}
                              w={4}
                              h={4}
                            />
                          ))}
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {new Date(ratingItem.timestamp).toLocaleDateString()}
                        </Text>
                      </HStack>
                      {ratingItem.comment && (
                        <Text fontSize="sm" mt={1}>
                          {ratingItem.comment}
                        </Text>
                      )}
                    </CardBody>
                  </Card>
                ))}
                {routeRatings.length > 3 && (
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    +{routeRatings.length - 3} more ratings
                  </Text>
                )}
              </VStack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default RatingSystem;