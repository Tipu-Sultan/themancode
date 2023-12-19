import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text, Grid, GridItem, Heading } from "@chakra-ui/react";
import Ripple from "../home/Ripple";
import { FaGithub } from "react-icons/fa";

const GitHubTimeline = () => {
  const [commits, setCommits] = useState([]);
  const username = "Tipu-Sultan"; 
  const repoName = "themancode";
  const accessToken = process.env.REACT_APP_GIT_KEY; 
  useEffect(() => {
    axios
      .get(
        `https://api.github.com/repos/${username}/${repoName}/commits?per_page=6`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setCommits(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching GitHub data: ${accessToken}`, error);
      });
  }, [accessToken]);

  return (
    <Flex justifyContent="center">
      <Box width="80%">
        <Flex alignItems="center" flexDirection="column">
          <FaGithub size={40} />
          <Heading as="h2" size="xl" textAlign="center">
            Timeline <Ripple />
          </Heading>
        </Flex>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={4}
        >
          {commits.map((commit, index) => (
            <GridItem key={index}>
              <Text fontSize="lg" fontWeight="bold">
                {new Date(commit.commit.author.date).toDateString()}
              </Text>
              {index >= 0 && (
                <Box h="3px" bg="red.900" my="2" w="30%" borderRadius={"5px"} />
              )}
              <Text>
                <Text>{commit.commit.author.name}</Text>
                <Text color="blue.500">{commit.commit.message}</Text>
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default GitHubTimeline;
