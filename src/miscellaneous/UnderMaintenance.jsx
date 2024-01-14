import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const UnderMaintenance = () => {
  return (
    <Layout title={'Page Not Found'}>
      <Flex
        direction="row"
        align="center"
        justify="center"
        h="100vh"
        mt={100}
        w={{ base: '90%', sm: '80%', md: '60%', lg: '70%' }}
        mx="auto"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Box textAlign="center" p={10}>
          <Heading size="xl">503</Heading>
          <Text fontSize="lg">Service Unavailable</Text>
          <Text fontSize="2xl" mt={2} role="img" aria-label="Sad face">
            😢 We apologize for the inconvenience, the website is currently under maintenance for improvements and will be back shortly.
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
};

export default UnderMaintenance;
