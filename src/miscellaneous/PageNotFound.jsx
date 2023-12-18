import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const PageNotFound = () => {
  return (
    <Layout title={'Page Not Found'}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
      >
        <Box textAlign="center" p={10}>
          <Heading size="xl">404</Heading>
          <Text fontSize="lg">Page Not Found</Text>
          <Text fontSize="2xl" mt={2} role="img" aria-label="Sad face">
            😢
          </Text>
        </Box>
      </Flex>
    </Layout>
  );
};

export default PageNotFound;
