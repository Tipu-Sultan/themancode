import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  let HOST = '';
  if (process.env.NODE_ENV === 'production') {
    HOST = 'https://mancode.onrender.com';
  } else {
    // Assuming development environment
    HOST = 'http://localhost:8080';
  }

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await axios.put(`${HOST}/api/auth/activate/${token}`);
        setTimeout(() => {
          navigate('/login')
          toast.success(response.data.message);
        }, 7000);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    // Call the function to activate the user
    activateUser();
  }, [token, navigate, HOST]);

  return (
    <Layout>
    <Flex
      align="center"
      justify="center"
      height="100vh"
      flexDirection="column"
      textAlign="center"
    >
      <Box p={4}>
        <Text fontSize="lg">Activating your account...</Text>
        <Text mt={4}>Please wait while we activate your account.</Text>
        <Spinner mt={4} size="lg" color="teal" />
      </Box>
    </Flex>
    </Layout>
  );
};

export default Activation;
