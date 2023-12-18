import React, { useState, useEffect } from "react";
import axios from "axios";
import img5 from "../assets/5.png";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

import {
  Container,
  Grid,
  GridItem,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Divider,
  HStack,
  Image,
  Textarea,
  Spinner,
  Flex,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import copy from "clipboard-copy";
import { DeleteIcon } from "@chakra-ui/icons";

const Videos = () => {
  const [socket, setSocket] = useState(null);
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const [openReplyTextareaForComment, setOpenReplyTextareaForComment] =
    useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    title: "",
    filename: "",
    description: "",
    size: 0,
    likes: 0,
    dislikes: 0,
    comments: [],
  });
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});
  const [currentVideoReplies, setCurrentVideoReplies] = useState({});
  const [openReplyTextarea, setOpenReplyTextarea] = useState(false);

  let HOST = "";
  if (process.env.NODE_ENV === "production") {
    HOST = "https://mancode.onrender.com";
  } else {
    HOST = "http://localhost:8080";
  }

  const formattedDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const newSocket = io(HOST);

    newSocket.on("connect", () => {
      console.log("Socket connected:", true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket connected:", false);
    });

    newSocket.on("newComment", (data) => {
      // Update UI with the new comment
      console.log("New Comment:", data);

      // Check if data has a 'comment' property
      const newComment = data.comment || data;

      setComments((prevComments) => [...prevComments, newComment]);
    });

    // Receiver side handling "newReply" event
    newSocket.on("newReply", (data) => {
      // Update UI with the new reply
      console.log("New Reply:", data.reply);

      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) => {
          if (comment._id === data.reply.commentId) {
            // Ensure that comment.replies is defined before applying filter
            const updatedReplies = comment.replies
              ? [...comment.replies, data.reply]
              : [data.reply];
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
          return comment;
        });
        return updatedComments;
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [HOST]); // Removed 'comments' from the dependency array

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${HOST}/getvideos`);
        setVideos(response.data);
        setCurrentVideo(response.data[0]);
        setComments(response.data[0].comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [HOST]);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `${HOST}/api/videos/${currentVideo._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: isUser._id || "",
            full_name: isUser.full_name,
            text: newComment,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNewComment("");

        // Emit the "newComment" event
        socket.emit("newComment", data.comment);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const response = await fetch(
        `${HOST}/api/videos/${currentVideo._id}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: isUser._id || "",
            full_name: isUser.full_name,
            text: replies[commentId] || "",
          }),
        }
      );

      if (response.ok) {
        // Emit "newReply" event with commentId after local update
        socket.emit("newReply", {
          reply: {
            user: isUser._id || "",
            full_name: isUser.full_name,
            text: replies[commentId] || "",
            commentId: commentId,
          },
        });

        // Clear the text area for the specific comment
        setReplies((prevReplies) => ({
          ...prevReplies,
          [commentId]: "",
        }));
      } else {
        console.error("Failed to add reply:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(
        `${HOST}/api/videos/${currentVideo._id}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        setCurrentVideo((prevVideo) => ({
          ...prevVideo,
          comments: prevVideo.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
        setCurrentVideoReplies((prevReplies) => {
          const { [commentId]: _, ...updatedReplies } = prevReplies;
          return updatedReplies;
        });
      } else {
        console.error("Failed to delete comment:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReplyDelete = async (commentId, replyId) => {
    try {
      if (!commentId || !replyId) {
        console.error("Invalid commentId or replyId:", commentId, replyId);
        return;
      }

      const response = await fetch(
        `${HOST}/api/videos/${currentVideo._id}/comments/${commentId}/replies/${replyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedComments = comments.map((comment) => {
          if (comment._id === commentId) {
            // Ensure that comment.replies is defined before applying filter
            const updatedReplies = comment.replies
              ? comment.replies.filter((reply) => reply._id !== replyId)
              : [];
            return {
              ...comment,
              replies: updatedReplies,
            };
          }
          return comment;
        });

        setComments(updatedComments);
      } else {
        console.error("Failed to delete reply:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  // Function to handle like action
  const handleLike = async () => {
    try {
      if (Cookies.get("liked_video_" + currentVideo._id)) {
        const response = await axios.post(
          `${HOST}/dislike/${currentVideo._id}`
        );
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.remove("liked_video_" + currentVideo._id);
        Cookies.set("disliked_video_" + currentVideo._id);
      } else {
        const response = await axios.post(`${HOST}/like/${currentVideo._id}`);
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.set("liked_video_" + currentVideo._id, "true");
        Cookies.remove("disliked_video_" + currentVideo._id);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Function to handle dislike action
  const handleDislike = async () => {
    try {
      if (Cookies.get("disliked_video_" + currentVideo._id)) {
        const response = await axios.post(`${HOST}/like/${currentVideo._id}`);
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.set("liked_video_" + currentVideo._id);
        Cookies.remove("disliked_video_" + currentVideo._id);
      } else {
        const response = await axios.post(
          `${HOST}/dislike/${currentVideo._id}`
        );
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.set("disliked_video_" + currentVideo._id);
        Cookies.remove("liked_video_" + currentVideo._id);
      }
    } catch (error) {
      console.error("Error toggling dislike:", error);
    }
  };

  const fileSizeInMB = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setComments(video.comments);
  };

  const handleShare = () => {
    const videoLink = `${HOST}/uploads/${encodeURIComponent(
      currentVideo.filename
    )}`;

    copy(videoLink);

    alert("Video link copied to clipboard!");
  };

  return (
    <Container maxW={"container.xl"} py={6} mt={"20"}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Grid templateColumns={["1fr", "1fr", "3fr 1fr"]} gap={6}>
          <GridItem colSpan={1}>
            <Box h={["300px", "400px", "600px"]} bg="gray.200">
              {currentVideo && (
                <iframe
                  src={`${HOST}/uploads/${encodeURIComponent(
                    currentVideo.filename
                  )}`}
                  title={currentVideo.title}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  borderRadius="15px"
                />
              )}
            </Box>
            <VStack align="flex-start" p={4}>
              <Heading size="lg">{currentVideo && currentVideo.title}</Heading>
              <Text>{currentVideo && currentVideo.description}</Text>
              <Text>
                {currentVideo && `Size: ${fileSizeInMB(currentVideo.size)}`}
              </Text>
            </VStack>
            <Divider my={4} />
            <HStack spacing={2} p={2} align="center">
              <Button
                variant="outline"
                colorScheme="blue"
                size="sm"
                onClick={handleLike}
              >
                Like ({currentVideo && currentVideo.likes})
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                size="sm"
                onClick={handleDislike}
              >
                Dislike ({currentVideo && currentVideo.dislikes})
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                Share
              </Button>
            </HStack>
            <Divider my={4} />
            <VStack align="flex-start" p={4} spacing={4} width="100%">
              <Heading size="md">Comments</Heading>
              <Textarea
                placeholder="Add a public comment..."
                size="md"
                width="100%"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                mt={2}
                colorScheme="purple"
                size="sm"
                onClick={handleCommentSubmit}
              >
                Comment
              </Button>

              {comments
                .slice()
                .reverse()
                .map((comment, commentIndex) => (
                  <Box
                    key={comment._id}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    position="relative"
                    width="100%"
                  >
                    <Flex justify="space-between" align="center" width="100%">
                      <Flex align="center">
                        <Avatar size="sm" name={comment.full_name} mr={2} />
                        <Text fontWeight="bold">{comment.full_name}</Text>
                        <Text ml={5} color="gray.100" fontSize="sm">
                          {formattedDate(comment.updatedAt)}
                        </Text>
                      </Flex>
                      {isUser && isUser._id === comment.user && (
                        <IconButton
                          colorScheme="red"
                          size="sm"
                          icon={<DeleteIcon />}
                          onClick={() => handleCommentDelete(comment._id)}
                        />
                      )}
                    </Flex>

                    <Text ml={10} mt={2} mb={2} color="gray.100" fontSize="md">
                      {comment.text}
                    </Text>

                    {comment.replies && comment.replies.length > 0 && (
                      <VStack pl={8} spacing={2} width="100%">
                        <Divider />
                        {comment.replies.map((reply, replyIndex) => (
                          <Flex
                            key={reply._id}
                            justify="space-between"
                            align="center"
                            width="100%"
                            p={2}
                            borderRadius="md"
                          >
                            <Flex align="center">
                              <Avatar size="xs" name={reply.full_name} mr={2} />
                              <VStack align="flex-start" spacing={1}>
                                <Text>{reply.full_name}</Text>
                                <Text ml={2} color="gray.100" fontSize="sm">
                                  {formattedDate(reply.createdAt)}
                                </Text>
                              </VStack>
                            </Flex>
                            <Text>{reply.text}</Text>
                            {isUser && isUser._id === reply.user && (
                              <IconButton
                                colorScheme="red"
                                size="sm"
                                icon={<DeleteIcon />}
                                onClick={() =>
                                  handleReplyDelete(comment._id, reply._id)
                                }
                              />
                            )}
                          </Flex>
                        ))}
                      </VStack>
                    )}
                    {openReplyTextareaForComment === comment._id && (
                      <>
                        <Textarea
                          placeholder="Add a reply..."
                          size="sm"
                          width="100%"
                          value={replies[comment._id] || ""}
                          onChange={(e) =>
                            setReplies({
                              ...replies,
                              [comment._id]: e.target.value,
                            })
                          }
                        />
                        <Button
                          mt={2}
                          colorScheme="purple"
                          size="sm"
                          onClick={() => handleReplySubmit(comment._id)}
                        >
                          Reply
                        </Button>
                      </>
                    )}

                    {/* Button to toggle the reply textarea */}
                    <Button
                      mt={2}
                      ml={2}
                      colorScheme="purple"
                      size="sm"
                      onClick={() =>
                        setOpenReplyTextareaForComment(
                          openReplyTextareaForComment === comment._id
                            ? null
                            : comment._id
                        )
                      }
                    >
                      {openReplyTextareaForComment === comment._id
                        ? "Cancel Reply"
                        : "Reply"}
                    </Button>
                  </Box>
                ))}
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            {/* Related Videos */}
            <VStack align="stretch" p={4}>
              <Heading size="lg">Related Videos</Heading>
              {videos.map((video) => (
                <Box
                  key={video.title}
                  p={2}
                  borderWidth="1px"
                  borderRadius="lg"
                  onClick={() => handleVideoClick(video)}
                  cursor="pointer"
                  mb={4}
                  display="flex"
                >
                  <Image
                    src={img5}
                    alt="Video Banner"
                    borderRadius="lg"
                    boxSize="80px"
                    objectFit="cover"
                    mr={4}
                    flexShrink={0}
                  />
                  <VStack align="flex-start">
                    <Text fontSize="lg">{video.title}</Text>
                    <HStack>
                      <Text fontSize="sm">Likes: {video.likes}</Text>
                      <Text fontSize="sm">Views: 1000</Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      )}
    </Container>
  );
};

export default Videos;
