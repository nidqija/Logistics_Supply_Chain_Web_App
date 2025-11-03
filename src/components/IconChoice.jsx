import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { FaBoxOpen, FaClipboardCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";



function IconChoice(){
     return (
        <>
        <div style={{height:"41rem" , width:"100%"}}>
         <Box py={16} mt={10} px={10} bg={useColorModeValue("gray.50", "gray.800")}>
      <Heading mb={10} textAlign="center">
        Welcome to Logistech
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
      <FeatureCard spacing={4}
         title={<Center><FaBoxOpen className="text-center" style={{fontSize:'100px', justifyContent:'center' }} /></Center>}
        description="Tasks"
       />

        <FeatureCard spacing={4}
          title={<Center><FaLock className="text-center" style={{fontSize:'100px', }} /></Center>}
          description="Inventory"
        />

        <FeatureCard spacing={4}
          title={<Center><FaClipboardCheck style={{fontSize:'100px', }}/></Center>}
          description="Task History"
        />

      <FeatureCard spacing={4}
          title={<Center><MdManageAccounts style={{fontSize:'100px', }} /></Center>}
          description="Driver Dashboard"
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