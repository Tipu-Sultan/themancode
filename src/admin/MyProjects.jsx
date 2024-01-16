import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CodeBlock() {
  const [myProjects, setMyProjects] = useState([]);
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const isAdmin = isUser?.access === "admin";
  const HOST = process.env.REACT_APP_API_HOST;
  const bgColor = useColorModeValue("#151f21", "gray.900")

  const deleteVideos = async (proId) => {
    try {
      const response = await axios.delete(`${HOST}/api/project/${proId}`);
      if (response.status === 200) {
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/project`);
        setMyProjects(response.data);
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
          <Th>Project Name</Th>
          <Th>Tools</Th>
          <Th>Actions</Th>
          {isAdmin && <Th>Delete</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {myProjects.map((item, i) => (
          <Tr key={i}>
            <Td>{item.project_name}</Td>
            <Td>{item.tools}</Td>
            <Td>
              <Button
                bg={bgColor}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                <a href={`/addproject/${item._id}`}>Edit Project</a>
              </Button>
            </Td>
            {isAdmin && (
              <Td>
                <Button
                  bg={"red.400"}
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
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
