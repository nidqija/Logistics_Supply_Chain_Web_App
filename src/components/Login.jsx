import { Box , Button , FormControl , VStack , Input , FormLabel , FormErrorMessage } from "@chakra-ui/react";
import "../App.css";


export default function LoginPage(){

  return (
        <div style={{height:'50rem'}}>
          <h1>Charger</h1>
       <Box   width={{ base: "100%", sm: "400px", md: "30rem" }} mx="auto" mt={20} >

    <form>
         <VStack spacing={5} padding={8} style={{backgroundColor:'lightblue' , borderRadius:'20px'}}>
            <h2>Login</h2>
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

    
     
     <Button background={"beige"}>Enter</Button>
     <p>Don't have an account? <a href="/signup">Sign Up</a></p>
       </VStack>
    </form>
   </Box>
  </div>
  )

}