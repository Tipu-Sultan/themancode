// VideoDetails.js
import React from "react";
import {
  Heading,
  Text,
  VStack,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";

const VideoDetails = ({
  currentVideo,
  handleLike,
  handleDislike,
  handleShare,
  isUser,
}) => {
  const fileSizeInMB = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  };
  return (
    <>
      <VStack align="flex-start" p={4}>
        <Heading size="lg">{currentVideo && currentVideo.title}</Heading>
        <Text>{currentVideo && currentVideo.description}</Text>
        <Text>
          {currentVideo && `Size: ${fileSizeInMB(currentVideo.size)}`}
        </Text>
      </VStack>
      <Divider my={4} />
      <HStack spacing={2} p={2} align="center">
        {isUser &&
          <>
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
          </>
        }
        <Button variant="outline" size="sm" onClick={handleShare}>
          Share
        </Button>
      </HStack>
      <Divider my={4} />
    </>
  );
};

export default VideoDetails;
