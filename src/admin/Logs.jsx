import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CodeBlock() {
  const [userLogs, setUserLogs] = useState([]);
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const isAdmin = isUser?.access === "admin";
  const HOST = process.env.REACT_APP_API_HOST

  const deleteLog = async (logId) => {
    try {
      const response = await axios.delete(`${HOST}/api/userlogs/${logId}`);

      if (response.status === 200) {
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/userlogs`);
        setUserLogs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [HOST]);

  return (
    <Table variant="simple">
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
  );
}
