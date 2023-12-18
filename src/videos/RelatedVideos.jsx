// RelatedVideos.js
import React from "react";
import { VStack, Heading, Text, HStack, Image, Box } from "@chakra-ui/react";
import img5 from "../assets/5.png";
const RelatedVideos = ({ videos, handleVideoClick }) => {
  return (
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
  );
};

export default RelatedVideos;
