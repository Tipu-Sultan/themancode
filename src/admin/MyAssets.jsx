import {
  Heading,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import MyProjects from "./MyProjects";
import MyVideos from "./MyVideos";
import Logs from "./Logs";
import ReceivePayment from "./ReceivePayment";
import Layout from "../components/Layout";

export default function MyAssets() {
  return (
    <Layout title={'Home'}>
      <Box p={[4, 6, 8, 10]}>

        <Heading as="h2" mt={8} mb={6} fontSize={["xl", "2xl", "3xl", "4xl"]}>
          My Assets
        </Heading>

        <Tabs variant='enclosed'>
          <TabList mb={4}>
            <Tab>Projects</Tab>
            <Tab>Videos</Tab>
            <Tab>Logs</Tab>
            <Tab>Payments</Tab>
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

            <TabPanel>
              <ReceivePayment />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
}
