// Import necessary Chakra UI components
import { Box, Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MyProjects from './MyProjects';
import MyVideos from './MyVideos'; 
import Logs from './Logs';
import Layout from '../components/Layout';


const MyAssets = () => {
  return (
    <Layout title={'Home'}>
    <Container maxW="container.xl" mt={10}>
      <Heading as="h2" mt={20}>My Assets</Heading>
      <Tabs>
        <TabList>
          <Tab>Projects</Tab>
          <Tab>Videos</Tab>
          <Tab>Logs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MyProjects />
          </TabPanel>
          <TabPanel>
            <MyVideos />
          </TabPanel>

          <TabPanel>
            <Logs />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
    </Layout>
  );
};

export default MyAssets;
