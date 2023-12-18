import {
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Avatar
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

const Forgot = () => {
  const navigate = useNavigate();
  const [data, setEmail] = useState({userValue:""});
  const [wait, setWait] = useState(false);

  const handleInput = e => {
    const { name, value } = e.target;
    setEmail(preValue => ({
      ...preValue,
      [name]: value,
    }));
  };

  const handleForgotPassword = async (e) => {
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
    const response = await axios.post(`${HOST}/api/auth/forgotPassword`,data);
      toast.success(response.data.message);
      setWait(false);
      setTimeout(() => navigate('/resetPassword'),500);
    } catch (error) {
      toast.error(error.response.data.error);
      setWait(false);
    }
  };

  return (
    <Layout title={'forgot-password'}>
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleForgotPassword}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading textAlign={'center'}>Forgot Password</Heading>
          <Avatar alignSelf={'center'} boxSize={'32'} src="https://icon-library.com/images/cool-discord-icon/cool-discord-icon-6.jpg" />
          <Input
            placeholder={'Enter Email or Phone'}
            type={'text'}
            required
            focusBorderColor={'purple.500'}
            onChange={handleInput}
            value={data.userValue || ""}
            name='userValue'
          />

          <Button variant={'link'} alignSelf={'flex-end'}>
            <Link to={'/login'}>Retry to login</Link>
          </Button>

          <Button colorScheme={'purple'} type={'submit'} isLoading={wait}>
            Send email
          </Button>
        </VStack>
      </form>
    </Container>
    </Layout>
  );
};

export default Forgot;
