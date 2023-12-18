import { Box, Heading, Button, Divider } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import copy from "clipboard-copy";
import he from "he";
import { useState } from "react";

const CodeReader = ({ codeString, languages }) => {
  const isMarkdown = codeString.startsWith("```");

  const [buttonText, setButtonText] = useState("Copy");

  const handleCopyClick = () => {
    const decodedContent = he.decode(
      isMarkdown ? codeString : codeString.replace(/<\/?[^>]+(>|$)/g, "")
    );
    copy(decodedContent);
    setButtonText("Copied");

    // Reset the button text after 5 seconds
    setTimeout(() => {
      setButtonText("Copy");
    }, 1200);
  };

  return (
    <Box
      borderRadius="lg"
      bgColor="dark.100"
      padding={4}
      mt={{ base: 8, md: 16 }} // Adjusted top margin for better spacing
      mb={8}
      mx={{ base: 4, md: 10 }} // Added horizontal margin for better responsiveness
      overflow="auto"
      maxHeight="500px"
      position="relative"
    >
      <Heading mb={6} fontSize={{ base: "xl", md: "2xl" }}>
        {" "}
        {languages}
      </Heading>
      <Divider
        height={1}
        borderColor="blue.500"
        backgroundColor={'red.500'}
        borderRadius="5px"
        marginY="20px"
      />
      {isMarkdown ? (
        <ReactMarkdown>{codeString}</ReactMarkdown>
      ) : (
        <div style={{marginLeft:"20px"}} dangerouslySetInnerHTML={{ __html: codeString }} />
      )}
      <Button
        position="absolute"
        top={4}
        right={4}
        onClick={handleCopyClick}
        size="sm"
        colorScheme="blue"
        fontSize="sm" // Adjusted font size for better appearance
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default CodeReader;
