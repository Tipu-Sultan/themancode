// CommentSection.js
import React from "react";
import {
  VStack,
  Heading,
  Textarea,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Comment from "./Comment";

const CommentSection = ({
  isUser,
  newComment,
  setNewComment,
  handleCommentSubmit,
  comments,
  handleCommentDelete,
  replies,
  setReplies,
  handleReplySubmit,
  handleReplyDelete,
  setOpenReplyTextareaForComment,
  openReplyTextareaForComment,
  wait,
}) => {
  const useColor = useColorModeValue("gray.800", "gray.100");

  return (
    <VStack align="flex-start" p={4} spacing={4} width="100%">
      <Heading size="md">Comments</Heading>
      <Textarea
        placeholder="Add a public comment..."
        size="md"
        width="100%"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        color={useColor}
      />
      <Button
        mt={2}
        colorScheme="purple"
        size="sm"
        onClick={handleCommentSubmit}
        isLoading={wait}
      >
        Comment
      </Button>

      {comments
        .slice()
        .reverse()
        .map((comment, commentIndex) => (
          <Comment
            key={comment._id}
            comment={comment}
            commentIndex={commentIndex}
            comments={comments}
            handleCommentDelete={handleCommentDelete}
            replies={replies}
            setReplies={setReplies}
            wait={wait}
            handleReplySubmit={handleReplySubmit}
            handleReplyDelete={handleReplyDelete}
            setOpenReplyTextareaForComment={setOpenReplyTextareaForComment}
            openReplyTextareaForComment={openReplyTextareaForComment}
            isUser={isUser}
          />
        ))}
    </VStack>
  );
};

export default CommentSection;
