import { Box , Button , FormControl , VStack , Input , FormLabel , FormErrorMessage } from "@chakra-ui/react";
import "../App.css";


export default function SignUpPage(){

  return (
    
   <Box   width={{ base: "90%", sm: "400px", md: "30rem" }} mx="auto" mt={10} >
    <form>
         <VStack spacing={5} padding={8} style={{backgroundColor:'beige' , borderRadius:'20px'}}>
            <h2>Sign Up</h2>
/*==================== this is email form ===============================*/
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input background={"white"}/>
        <FormErrorMessage>Email is required</FormErrorMessage>
      </FormControl>


/* =================== this is password form ===========================*/

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input background={"white"}/>
        <FormErrorMessage>Password is required</FormErrorMessage>
      </FormControl>

/* =================== this is confirm password form ===========================*/

      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input background={"white"}/>
        <FormErrorMessage>Password is required</FormErrorMessage>
      </FormControl>
     
     <Button background={"lightblue"}>Enter</Button>
       </VStack>
    </form>
   </Box>
  
  )

}