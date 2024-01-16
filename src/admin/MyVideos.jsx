import {
  Text,
  Stack,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function VideoTable() {
  const [myVideos, setMyVideos] = useState([]);
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const isAdmin = isUser?.access === "admin";
  const HOST = process.env.REACT_APP_API_HOST;
  const bgColor = useColorModeValue("#151f21", "gray.900")

  const deleteVideo = async (vidId) => {
    try {
      const response = await axios.delete(`${HOST}/api/videos/${vidId}`);

      if (response.status === 200) {
        setMyVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== vidId)
        );
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Error deleting video");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/api/videos`);
        setMyVideos(response.data);
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
              <Th>Video Title</Th>
              <Th>Languages</Th>
              <Th>Views/Likes</Th>
              <Th>Actions</Th>
              {isAdmin && <Th>Delete</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {myVideos.map((video, i) => (
              <Tr key={i}>
                <Td>{video.title}</Td>
                <Td>{video.languages}</Td>
                <Td>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>{video.views}</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Likes {video.likes}
                    </Text>
                  </Stack>
                </Td>
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
                    <a href={`/videos/${video._id}`}>View Video</a>
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
                      onClick={() => deleteVideo(video._id)}
                    >
                      Delete Video
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
  );
}
