// Comment.js
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  Divider,
  Textarea,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Comment = ({
  comment,
  commentIndex,
  comments,
  handleCommentDelete,
  replies,
  setReplies,
  handleReplySubmit,
  handleReplyDelete,
  setOpenReplyTextareaForComment,
  openReplyTextareaForComment,
  isUser,
  wait
}) => {
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
  const useColor = useColorModeValue("gray.800", "gray.300");
  return (
    <Box
      key={comment._id}
      borderWidth="2px"
      borderRadius="lg"
      p={4}
      position="relative"
      width="100%"
      borderColor={useColor}
    >
      <Flex justify="space-between" align="center" width="100%">
        <Flex align="center">
          <Avatar size="sm" name={comment.full_name} mr={2} />
          <Text fontWeight="bold">{comment.full_name}</Text>
          <Text ml={5} color={useColor} fontSize="sm">
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

      <Text ml={10} mt={2} mb={2} color={useColor} fontSize="md">
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
                  <Text ml={2} color={useColor} fontSize="sm">
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
                  onClick={() => handleReplyDelete(comment._id, reply._id)}
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
            required
          />

          <Button
            mt={2}
            colorScheme="green"
            size="sm"
            onClick={() => handleReplySubmit(comment._id)}
            isLoading={wait}
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
            openReplyTextareaForComment === comment._id ? setReplies("") : comment._id
          )
        }
      >
        {openReplyTextareaForComment === comment._id ? "Cancel Reply" : "Reply"}
      </Button>
    </Box>
  );
};

export default Comment;
