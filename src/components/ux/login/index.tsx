import {
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

const Login = () => {

    return (
        <div
          style={{
            position: "fixed",
            top: "150px",
            left: "150px",
            zIndex: 999,
          }}
        >
        <FormControl>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='username' placeholder='Username' />

          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input id='password' type='password' placeholder='Password' />

          
        </FormControl>
        <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Play
          </Button>
          <Button
            mt={4}
            colorScheme='red'
            type='submit'
          >
            New Player
          </Button>
        </div>
      )
}

export default Login;