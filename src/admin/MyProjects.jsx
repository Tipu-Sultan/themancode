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
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";
  
  export default function CodeBlock() {
    const [myProjects, setMyProjects] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state
    const isLogin = localStorage.getItem("isLogin");
    const isUser = isLogin ? JSON.parse(isLogin) : null;
    const isAdmin = isUser?.access === "admin";
    const HOST = process.env.REACT_APP_API_HOST;
  
    const deleteVideos = async (proId) => {
      try {
        const response = await axios.delete(`${HOST}/api/project/${proId}`);
  
        if (response.status === 200) {
          // Remove the deleted code block from the state
          setMyProjects((prevCodeBlocks) =>
            prevCodeBlocks.filter((codeBlock) => codeBlock._id !== proId)
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
        // Fetch data from your MongoDB API endpoint
        const fetchData = async () => {
          try {
            const response = await axios.get(`${HOST}/api/project`);
            setMyProjects(response.data); // Assuming your API returns an array of projects
            setLoading(false)
          } catch (error) {
            setLoading(false)
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  
    return (
      <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="300px"
    >
        {loading ? ( // Render Spinner while loading
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
            {myProjects.map((item, i) => (
              <Box
                key={i}
                maxW={"270px"}
                w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={3}>
                    <Heading
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {item.project_name}
                    </Heading>
                    <Text color={"gray.500"} fontSize="sm">
                      {item.tools}
                    </Text>
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
                  >
                    <a href={`/addproject/${item._id}`}>Edit Project</a>
                  </Button>
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
                      onClick={() => deleteVideos(item._id)}
                    >
                      Delete Project
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    );
  }
  