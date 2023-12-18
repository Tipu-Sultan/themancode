import {
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Avatar,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

const Forgot = () => {
  const navigate = useNavigate();
  const HOST = process.env.REACT_APP_API_HOST
  const [data, setData] = useState({ password: '', cpassword: '', otp: '' });
  const [wait, setWait] = useState(false);
  const [check, setCheck] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleInput = e => {
    const { name, value } = e.target;
    setData(preValue => ({
      ...preValue,
      [name]: value,
    }));

    if (name === 'cpassword') {
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

  const handleForgotPassword = async e => {
    e.preventDefault();

    setWait(true);

    try {
      const response = await axios.post(`${HOST}/api/auth/resetPassword`, data);
      setWait(false);
      setTimeout(() => {
        navigate('/login');
        toast.success(response.data.message);
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.error);
      setWait(false);
    }
  };

  return (
    <Layout>
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleForgotPassword}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading textAlign={'center'}>Reset Password</Heading>
          <Avatar alignSelf={'center'} boxSize={'32'} />
          <Input
            placeholder={'Enter OTP'}
            type={'text'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.otp || ''}
            name="otp"
          />

          <Input
            placeholder={'New Password'}
            type={'password'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.password || ''}
            name="password"
          />

          <InputGroup>
            <Input
              placeholder={'Confirm Password'}
              type={isPasswordVisible ? 'text' : 'password'}
              required
              focusBorderColor={check ? 'purple.500' : 'red.500'}
              onChange={handleInput}
              value={data.cpassword || ''}
              name="cpassword"
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
            Reset Password
          </Button>

          <Text textAlign={'right'}>
            Back to login?{' '}
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

export default Forgot;
