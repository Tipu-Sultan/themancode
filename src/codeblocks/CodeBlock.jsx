import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  SimpleGrid,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

export default function CodeBlock() {
  const HOST = process.env.REACT_APP_API_HOST
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const isAdmin = isUser?.access === "admin";

  const deleteCode = async (codeId) => {
    try {
      const response = await axios.delete(`${HOST}/api/codeblocks/${codeId}`);

      if (response.status === 200) {
        // Remove the deleted code block from the state
        setCodeBlocks((prevCodeBlocks) =>
          prevCodeBlocks.filter((codeBlock) => codeBlock._id !== codeId)
        );

        toast.success(response.data.message);
      } else {
        toast.error("Error deleting code block");
      }
    } catch (error) {
      console.error("Error deleting code block:", error);
      toast.error("Error deleting code block");
    }
  };

  useEffect(() => {
    // Fetch code blocks from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/codeblocks`);
        setCodeBlocks(response.data);
        setLoading(false); // Set loading to false when content is loaded
      } catch (error) {
        setErrorMsg("Couldn't fetch code blocks");
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [HOST]);

  return (
    <Layout title={'Code-block'} description={'get my latest code snippet for mern'}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="300px"
      >
        {loading ? ( // Render Spinner while loading
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
            <Text>Wait a couple of minutes</Text>
          </>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={6}
            mx={{ base: 4, md: 10 }}
            mt={90}
            mb={20}
          >
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontSize="2xl"
            >
              {errorMsg}
            </Text>
            {codeBlocks.map((item, i) => (
              <Box
                key={i}
                maxW={"270px"}
                w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                style={{
                  boxShadow:
                    `2px 2px 2px 2px rgba(255, 0, 0, 0.5)`
                }}
              >
                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={3}>
                    <Heading
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {item.title}
                    </Heading>
                    <Text color={"gray.500"} fontSize="sm">
                      {item.languages}
                    </Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={2}>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>{item.views}</Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Views
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    w={"full"}
                    mt={6}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    bg={useColorModeValue("#151f21", "gray.900")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    as={RouterLink}
                    to={`/codereader/${item._id}`}
                  >
                    View Code
                  </Button>
                  {isAdmin && (
                    <Button
                      w={"full"}
                      mt={6}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      bg={useColorModeValue("#151f21", "gray.900")}
                      color={"white"}
                      rounded={"md"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      as={RouterLink}
                      to={`/editor/${item._id}`}
                    >
                      Edit Code
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      w={"full"}
                      bg={"red.400"}
                      mt={6}
                      color={"white"}
                      rounded={"md"}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      onClick={() => deleteCode(item._id)}
                    >
                      Delete Code
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Layout>
  );
}
