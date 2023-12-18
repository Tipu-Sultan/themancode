// Videos.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { Container, Grid, GridItem, Spinner } from "@chakra-ui/react";
import VideoPlayer from "./VideoPlayer";
import VideoDetails from "./VideoDetails";
import CommentSection from "./CommentSection";
import RelatedVideos from "./RelatedVideos";
import copy from "clipboard-copy";
import Layout from "../components/Layout";

const Videos = () => {
  const HOST = process.env.REACT_APP_API_HOST
  const [socket, setSocket] = useState(null);
  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
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
  const [openReplyTextareaForComment, setOpenReplyTextareaForComment] = useState(null);

  // Function to handle like action
  const handleLike = async () => {
    try {
      if (Cookies.get("liked_video_" + currentVideo._id)) {
        const response = await axios.post(
          `${HOST}/api/videos/dislike/${currentVideo._id}`
        );
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.remove("liked_video_" + currentVideo._id);
        Cookies.set("disliked_video_" + currentVideo._id);
      } else {
        const response = await axios.post(`${HOST}/api/videos/like/${currentVideo._id}`);
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
        const response = await axios.post(`${HOST}/api/videos/like/${currentVideo._id}`);
        setCurrentVideo((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
        }));
        Cookies.set("liked_video_" + currentVideo._id);
        Cookies.remove("disliked_video_" + currentVideo._id);
      } else {
        const response = await axios.post(
          `${HOST}/api/videos/dislike/${currentVideo._id}`
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

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setComments(video.comments);
  };

  const handleShare = () => {
    const videoLink = `https://storage.cloud.google.com/edunify/${encodeURIComponent(
      currentVideo.filename
    )}`;

    copy(videoLink);

    alert("Video link copied to clipboard!");
  };

  const handleCommentSubmit = async () => {
    try {
      // Check if currentVideo is set and has an _id property
      if (!currentVideo || !currentVideo._id) {
        console.error("Current video is not properly initialized");
        return;
      }

      const response = await fetch(
        `${HOST}/api/videos/comments/${currentVideo._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: isUser?._id || "",
            full_name: isUser?.full_name,
            text: newComment,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNewComment("");
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
        `${HOST}/api/videos/comments/${currentVideo._id}/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: isUser?._id || "",
            full_name: isUser?.full_name || "",
            text: replies[commentId] || "",
          }),
        }
      );

      if (response.ok) {
        // Emit "newReply" event with commentId after local update
        const data = await response.json();
        // Check if the socket is available before emitting
        if (socket) {
          socket.emit("newReply", data);
        }

        // Clear the text area for the specific comment
        setReplies((prevReplies) => ({
          ...prevReplies,
          [commentId]: "", // Clearing the text area for the specific comment
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
        `${HOST}/api/videos/comments/${currentVideo._id}/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Emit "deleteComment" event with commentId
        socket.emit("deleteComment", { commentId });
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
        `${HOST}/api/videos/comments/${currentVideo._id}/${commentId}/${replyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the state to reflect the deleted reply
        setComments((prevComments) => {
          const updatedComments = prevComments.map((comment) => {
            if (comment._id === commentId) {
              const updatedReplies = comment.replies
                ? comment.replies.filter((r) => r._id !== replyId)
                : [];
              return {
                ...comment,
                replies: updatedReplies,
              };
            }
            return comment;
          });
          return updatedComments;
        });

        // Emit "deleteReply" event with commentId and replyId
        socket.emit("deleteReply", { commentId, replyId });
      } else {
        console.error("Failed to delete reply:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
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
      const newComment = data.comment || data;
      setComments((prevComments) => [...prevComments, newComment]);
    });

    newSocket.on("newReply", (data) => {
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) => {
          if (comment && comment._id === data.cmtId) {
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

    newSocket.on("deleteComment", ({ commentId }) => {
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
    });

    newSocket.on("deleteReply", ({ commentId, replyId }) => {
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment._id === commentId) {
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
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [HOST]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${HOST}/api/videos`);
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

  return (
    <Layout title={'my videos'} description={'watch my blogs and tech videos'} author={'themancode'}>
      <Container maxW={"container.xl"} py={6} mt={"20"} display="flex" alignItems="center" justifyContent="center">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Grid templateColumns={["1fr", "1fr", "3fr 1fr"]} gap={6}>
            <GridItem colSpan={1}>
              <VideoPlayer currentVideo={currentVideo} />
              <VideoDetails
                isUser={isUser}
                currentVideo={currentVideo}
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleShare={handleShare}
              />
              {isUser ?
                <CommentSection
                  isUser={isUser}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  handleCommentSubmit={handleCommentSubmit}
                  comments={comments}
                  handleCommentDelete={handleCommentDelete}
                  replies={replies}
                  setReplies={setReplies}
                  handleReplySubmit={handleReplySubmit}
                  handleReplyDelete={handleReplyDelete}
                  setOpenReplyTextareaForComment={setOpenReplyTextareaForComment}
                  openReplyTextareaForComment={openReplyTextareaForComment}
                />
                : "Please login to access & post comments"
              }
            </GridItem>
            <GridItem colSpan={1}>
              <RelatedVideos
                videos={videos}
                handleVideoClick={handleVideoClick}
              />
            </GridItem>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Videos;