import {
  Avatar,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

const Signup = () => {
  const [data, setData] = useState({
    full_name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [wait, setWait] = useState(false);
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInput = e => {
    const { name, value } = e.target;
    setData(preValue => ({
      ...preValue,
      [name]: value,
    }));

    if (name === 'password') {
      setCheck(isStrongPassword(value));
      setError(
        'Password must be at least 8 characters long and contain e.g: (@$!%*?&,A-Za-z,0-9)'
      );
    }
  };

  function isStrongPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const SubmitUser = async e => {
    e.preventDefault();
    let HOST = '';
    if (process.env.NODE_ENV === 'production') {
      HOST = 'https://mancode.onrender.com';
    } else {
      // Assuming development environment
      HOST = 'http://localhost:8080';
    }
    setWait(true);
    try {
      const response = await axios.post(`${HOST}/api/auth/signup`, data);

      setWait(false);
      setError(false);
      setTimeout(() => {
        navigate('/login');
        toast.success(response.data.message);
      }, 4000);
    } catch (error) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
      setWait(false);
    }
  };

  return (
    <Layout title={'Signup'}>
    <Container
      maxW={'container.xl'}
      h={'100vh'}
      p={'16'}
      style={{ marginBottom: '150px' }}
    >
      <form onSubmit={SubmitUser}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading textAlign={'center'}>Themancode</Heading>
          <Avatar alignSelf={'center'} boxSize={'32'} src="https://icon-library.com/images/cool-discord-icon/cool-discord-icon-6.jpg" />

          <Input
            placeholder={'Name'}
            type={'text'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.full_name || ''}
            name="full_name"
          />
          <Input
            placeholder={'Email'}
            type={'email'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.email || ''}
            name="email"
          />
          <Input
            placeholder={'Enter Number'}
            type={'number'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.phoneNumber || ''}
            name="phoneNumber"
          />
          <InputGroup>
            <Input
              placeholder={'Password'}
              type={isPasswordVisible ? 'text' : 'password'}
              required
              focusBorderColor={check ? 'purple.500' : 'red.500'}
              onChange={handleInput}
              value={data.password || ''}
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

          {!check && <p style={{ color: 'red' }}>{error || check}</p>}

          <Button colorScheme={'purple'} type={'submit'} isLoading={wait}>
            SignUp
          </Button>

          <Text textAlign={'right'}>
            Already Signed Up?{' '}
            <Button variant={'link'} colorScheme={'purple'}>
              <Link to={'/login'}>Login In</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
    </Layout>
  );
};

export default Signup;
