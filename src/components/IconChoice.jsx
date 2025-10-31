import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function IconChoice(){
     return (
        <>
        <div style={{height:"41rem" , width:"100%"}}>
         <Box py={16} px={10} bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading mb={10} textAlign="center">
        Our Features
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
      <FeatureCard
         title="Fast Delivery"
        description="Get your products delivered quickly and safely right to your doorstep."
       />

        <FeatureCard
          title="Secure Payment"
          description="Your transactions are protected with end-to-end encryption."
        />

        <FeatureCard
          title="Quality Guarantee"
          description="We ensure all our products meet the highest quality standards."
        />

      <FeatureCard
          title="24/7 Support"
          description="Our team is always here to help you with any questions or issues."
        />

      </SimpleGrid>
    </Box>
        </div>
    
        </>
     )
}

function FeatureCard({ title, description }) {
  return (
    <Card
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="md"
      rounded="xl"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
    >
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text color={useColorModeValue("gray.600", "gray.300")}>
          {description}
        </Text>
      </CardBody>
    </Card>
  );
}



export default IconChoice;