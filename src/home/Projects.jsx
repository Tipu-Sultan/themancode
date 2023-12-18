import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
  Stack,
  useColorModeValue,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [wait, setWait] = useState(false);
  const colorMode1 = useColorModeValue("gray.100", "gray.900")
  const colorMode2 = useColorModeValue("gray.900", "gray.100")
  const HOST = process.env.REACT_APP_API_HOST
  useEffect(() => {
    // Fetch data from your MongoDB API endpoint
    setWait(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/project`);
        setProjects(response.data);
        setWait(false)
      } catch (error) {
        setWait(true)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [HOST]);

  return (
    <Flex justifyContent="center" mt={10} mb={5}>
      <Box width="80%">
        <Heading as="h2" size="xl" mb={6}>
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: useBreakpointValue({ base: "20%", md: "30%" }),
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "red.400",
              zIndex: -1,
            }}
          >
            PROJECTS
          </Text>
        </Heading>
        <Box position="relative">
          {wait && (
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              flexDirection="column"
              alignItems="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
                mb={2}
              />
              <Text>Wait a couple of minutes</Text>
            </Flex>
          )}

          {!wait && (

            <Grid
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              gap={{ base: 4, md: 6 }}
            >
              {projects.map((project, index) => (
                <GridItem key={index}>
                  <Link to={project.link} target="_blank">
                    <Box
                      maxW={"auto"}
                      w={"full"}
                      bgColor={colorMode2}
                      boxShadow={"lg"}
                      rounded={"md"}
                      overflow={"hidden"}
                      h={"full"}
                    >
                      <Image
                        h={"120px"}
                        w={"full"}
                        src={project.banner}
                        objectFit="cover"
                        alt="#"
                      />
                      <Box p={3} h="100%">
                        <Text fontWeight={"bold"} mb={2} color={colorMode1}>
                          {project.project_name}
                        </Text>

                        <Stack direction={"row"} spacing={2} flexWrap="wrap">
                          {project.tools.split(',').map((tool, toolIndex) => (
                            <Badge
                              key={toolIndex}
                              bg={'teal'}
                              fontSize="0.8em"
                              borderRadius="full"
                              px={2}
                              mb={2}
                            >
                              {tool.trim()}
                            </Badge>
                          ))}
                        </Stack>
                      </Box>
                    </Box>
                  </Link>
                </GridItem>
              ))}
            </Grid>

          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default Projects;