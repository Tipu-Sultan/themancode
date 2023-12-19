import React, { useState } from 'react';
import {
  Container,
  Heading,
  Input,
  Button,
  Box,
  Text,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async () => {
    setLoading(true);

    // Replace 'your-api-endpoint' with the actual endpoint for URL shortening in your backend
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/urlshortner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();

    setLoading(false);

    if (response.ok) {
      setShortenedUrl(data.actualUrl);
      console.log(data.msg);
    } else {
      // Handle error cases
      console.error('Error shortening URL:', data.error);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Layout>
      <Container maxW="xl" centerContent mt={40}>
        <Heading as="h2" size="xl" mb={6}>
          URL Shortener
        </Heading>

        <Box w="100%" maxW="md">
          <Input
            placeholder="Enter your URL"
            size="lg"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <Button
            colorScheme="teal"
            size="lg"
            mt={4}
            onClick={handleShortenUrl}
            isLoading={loading}
            loadingText="Shortening..."
          >
            Shorten URL
          </Button>

          {shortenedUrl && (
            <Box mt={6} display="flex" alignItems="center">
            <Text fontSize="lg" mr={5}>
              Shortened URL:
            </Text>
            <ChakraLink href={shortenedUrl} isExternal flex="1" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              {shortenedUrl}
            </ChakraLink>
            <Icon
              as={CopyIcon}
              cursor="pointer"
              onClick={handleCopyClick}
              color={copied ? 'green.500' : 'teal.500'}
            />
            {copied && <Text ml={2} color="green.500">Copied!</Text>}
          </Box>
          
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default UrlShortener;
