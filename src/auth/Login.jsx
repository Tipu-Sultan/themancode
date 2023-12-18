import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Avatar,
  InputRightElement,
  InputGroup,
  Center
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';


const Login = () => {
  const navigate = useNavigate();
  const HOST = process.env.REACT_APP_API_HOST
  const [userData, setuserData] = useState({ email: '', password: '' });
  const [wait, setWait] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleInput = e => {
    const { name, value } = e.target;
    setuserData(preValue => ({
      ...preValue,
      [name]: value,
    }));
  };
  
const AuthenticateUser = async e => {
    e.preventDefault();

    setWait(true);
    try {
      const response = await axios.post(
        `${HOST}/api/auth/login`,
        userData
      );
      setuserData(response.data);
      localStorage.setItem('isLogin', JSON.stringify(response.data.user));
      toast.success(response.data.message);
      setWait(false);
      const currentPath = localStorage.getItem("currentPath");
      setTimeout(() => navigate(currentPath, 500));
    } catch (error) {
      toast.error(error.response.data.error);
      setWait(false);
    }
  };


  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Layout title={'Login'}>
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={AuthenticateUser}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading textAlign={'center'}>Welcome Back</Heading>
          <Avatar alignSelf={'center'} boxSize={'32'} src="https://icon-library.com/images/cool-discord-icon/cool-discord-icon-6.jpg" />
          <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={userData.email}
            name="email"
          />
          <InputGroup>
            <Input
              placeholder={'Password'}
              type={isPasswordVisible ? 'text' : 'password'}
              required
              onChange={handleInput}
              value={userData.password || ''}
              name="password"
            />
            <InputRightElement>
              <Button
                variant="ghost"
                colorScheme="gray"
                size="sm"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/forgetpassword'}>Forget Password?</Link>
          </Button>

          <Button colorScheme={'purple'} type={'submit'} isLoading={wait}>
            {wait ? 'Please wait..' : 'Login'}
          </Button>

          <Text textAlign={'right'}>
            New User?{' '}
            <Button variant={'link'} colorScheme={'purple'}>
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
    </Layout>
  );
};

export default Login;
