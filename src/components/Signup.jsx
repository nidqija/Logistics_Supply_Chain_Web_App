import { Box , Button , FormControl , VStack , Input , FormLabel , FormErrorMessage } from "@chakra-ui/react";
import "../App.css";


export default function SignUpPage(){

  return (
    <div style={{height:'50rem'}}>
          <h1>Logistech</h1>
       <Box   width={{ base: "100%", sm: "400px", md: "30rem" }} mx="auto" mt={20} >

    <form>
         <VStack spacing={5} padding={8} style={{backgroundColor:'lightblue' , borderRadius:'20px'}}>
            <h2>Sign Up</h2>
/*==================== this is email form ===============================*/
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input background={"white"} id="username"/>
        <FormErrorMessage>Email is required</FormErrorMessage>
      </FormControl>


/* =================== this is password form ===========================*/

      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input background={"white"} name="password"/>
        <FormErrorMessage>Password is required</FormErrorMessage>
      </FormControl>

/* =================== this is confirm password form ===========================*/

      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input background={"white"}/>
        <FormErrorMessage>Password is required</FormErrorMessage>
      </FormControl>
     <Button background={"beige"}>Enter</Button>
          <p>Signed up? <a href="/login">Log In</a></p>

       </VStack>
    </form>
   </Box>
   </div>
  
  )

}