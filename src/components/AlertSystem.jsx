import React, { useState } from 'react';
import {
  Box,
  Text,
  Card,
  CardBody,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Tag,
  HStack,
  VStack,
  Alert,
  AlertIcon,
  useDisclosure,
  Input
} from '@chakra-ui/react';
import { AddIcon, WarningIcon, InfoIcon, NotAllowedIcon } from '@chakra-ui/icons';

const AlertSystem = ({ alerts, onAddAlert, onMarkAsRead }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAlert, setNewAlert] = useState({
    type: 'info',
    title: '',
    message: '',
    priority: 'medium'
  });

  const handleCreateAlert = () => {
    if (!newAlert.title || !newAlert.message) {
      alert('Please fill in all fields');
      return;
    }

    onAddAlert(newAlert);
    setNewAlert({
      type: 'info',
      title: '',
      message: '',
      priority: 'medium'
    });
    onClose();
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <WarningIcon color="orange.500" />;
      case 'error': return <NotAllowedIcon color="red.500" />;
      default: return <InfoIcon color="blue.500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const getAlertBorderColor = (type) => {
    switch (type) {
      case 'warning': return 'orange.500';
      case 'error': return 'red.500';
      default: return 'blue.500';
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.read);

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Driver Alerts
        </Text>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={onOpen}
        >
          New Alert
        </Button>
      </HStack>

      {/* Alert Summary */}
      {unreadAlerts.length > 0 && (
        <Alert status="warning" borderRadius="md" mb={4}>
          <AlertIcon />
          You have {unreadAlerts.length} unread alert{unreadAlerts.length > 1 ? 's' : ''}
        </Alert>
      )}

      {/* Alerts List */}
      <Box maxH="400px" overflowY="auto">
        {alerts.length === 0 ? (
          <Text color="gray.600" textAlign="center" py={8}>
            No alerts at this time. Drive safely!
          </Text>
        ) : (
          <VStack spacing={3} align="stretch">
            {alerts.map((alert) => (
              <Card 
                key={alert.id}
                borderLeft="4px"
                borderLeftColor={getAlertBorderColor(alert.type)}
                opacity={alert.read ? 0.7 : 1}
              >
                <CardBody>
                  <HStack justify="space-between" align="flex-start">
                    <HStack align="flex-start" spacing={3} flex={1}>
                      {getAlertIcon(alert.type)}
                      <Box flex={1}>
                        <Text fontWeight="bold" fontSize="lg">
                          {alert.title}
                        </Text>
                        <Text color="gray.600" mt={1}>
                          {alert.message}
                        </Text>
                        <HStack mt={2} spacing={2}>
                          <Tag 
                            size="sm" 
                            colorScheme={getPriorityColor(alert.priority)}
                          >
                            {alert.priority}
                          </Tag>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                    {!alert.read && (
                      <Button 
                        size="sm" 
                        onClick={() => onMarkAsRead(alert.id)}
                        colorScheme="blue"
                        variant="outline"
                      >
                        Mark Read
                      </Button>
                    )}
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        )}
      </Box>

      {/* Create Alert Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Alert Type</FormLabel>
                <Select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="error">Critical</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={newAlert.priority}
                  onChange={(e) => setNewAlert({...newAlert, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Alert Title</FormLabel>
                <Input
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="Enter alert title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Alert Message</FormLabel>
                <Textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                  placeholder="Enter alert message"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateAlert}>
              Create Alert
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AlertSystem;