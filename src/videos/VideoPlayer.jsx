// VideoPlayer.js
import { Box } from "@chakra-ui/react";
import React from "react";

const VideoPlayer = ({ currentVideo }) => {
  return (
    <Box h={["300px", "400px", "600px"]} bg="gray.200">
      {currentVideo && (
        <iframe
          src={`https://storage.cloud.google.com/edunify/${encodeURIComponent(currentVideo.filename)}`}
          title={currentVideo.title}
          width="100%"
          height="100%"
          allowFullScreen
          aria-controls=""
        />
      )}
    </Box>
  );
};

export default VideoPlayer;
