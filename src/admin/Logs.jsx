import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Button,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";
  
  export default function CodeBlock() {
    const [userLogs, setUserLogs] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const isLogin = localStorage.getItem("isLogin");
    const isUser = isLogin ? JSON.parse(isLogin) : null;
    const isAdmin = isUser?.access === "admin";
    const HOST = process.env.REACT_APP_API_HOST
  
    const deleteLog = async (logId) => {
      try {
        const response = await axios.delete(`${HOST}/api/userlogs/${logId}`);
  
        if (response.status === 200) {
          // Remove the deleted log from the state
          setUserLogs((prevLogs) =>
            prevLogs.filter((log) => log._id !== logId)
          );
  
          toast.success(response.data.message);
        } else {
          toast.error("Error deleting log");
        }
      } catch (error) {
        console.error("Error deleting log:", error);
        toast.error("Error deleting log");
      }
    };
  
    useEffect(() => {
      // Fetch user logs from your MongoDB API endpoint
      const fetchData = async () => {
        try {
          const response = await axios.get(`${HOST}/api/userlogs`);
          setUserLogs(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [HOST]);
  
    return (
      <Flex direction="column" align="center" justify="center" minHeight="300px">
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
          <Table variant="simple" mt={8}>
            <Thead>
              <Tr>
                <Th>IP Address</Th>
                <Th>Device Info</Th>
                <Th>Timing</Th>
                <Th>Browser</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userLogs.map((log) => (
                <Tr key={log._id}>
                  <Td>{log.ip}</Td>
                  <Td>{log.deviceInfo}</Td>
                  <Td>{new Date(log.timing).toLocaleString()}</Td>
                  <Td>{log.browser}</Td>
                  <Td>
                    {isAdmin && (
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => deleteLog(log._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    );
  }
  