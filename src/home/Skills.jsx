import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

const array = [
  {
    frontend: {
      label: "Frontend",
      skills: [
        { name: "React", colorScheme: "teal" },
        { name: "Next.js(ongoing)", colorScheme: "alpha-900" },
        { name: "Html", colorScheme: "orange" },
        { name: "CSS", colorScheme: "teal" },
        { name: "JavScript", colorScheme: "orange" },
        { name: "Tailwind CSS", colorScheme: "aqua" },
      ],
    },
  },
  {
    backend: {
      label: "Backend",
      skills: [
        { name: "Node.js", colorScheme: "green" },
        { name: "Express.js", colorScheme: "purple" },
        { name: "API's", colorScheme: "gray" },
      ],
    },
  },
  {
    database: {
      label: "Databases",
      skills: [
        { name: "MySql", colorScheme: "yellow" },
        { name: "MongoDB", colorScheme: "green" },
      ],
    },
  },
  {
    tools: {
      label: "Tools",
      skills: [
        { name: "GitHub", colorScheme: "grey" },
        { name: "Vercel", colorScheme: "orange" },
        { name: "Render", colorScheme: "blue" },
        { name: "Google console", colorScheme: "red" },
      ],
    },
  },
];

const Skills = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.100");

  return (
    <Flex justifyContent="center" mt={10} mb={5}>
      <Box width="80%">
        <Heading as="h2" size="xl" mb={6}>
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: useBreakpointValue({ base: "20%", md: "30%" }),
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "blue.400",
              zIndex: -1,
            }}
          >
            Skills
          </Text>
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {array.map((category, index) => (
            <GridItem key={index}>
              <Box
                maxW={"auto"}
                w={"full"}
                bgColor={bgColor}
                boxShadow={"lg"}
                rounded={"md"}
                overflow={"hidden"}
                minHeight="200px" // Set a minimum height for the card
              >
                <Box
                  p={6}
                  maxW={"auto"}
                  w={"full"}
                >
                  <Text fontWeight={"bold"} mb={2} color={textColor}>
                    {category[Object.keys(category)[0]].label}
                  </Text>
                  <HStack
                    direction={"row"}
                    spacing={2}
                    wrap={"wrap"}
                  >
                    {category[Object.keys(category)[0]].skills.map((skill, index) => (
                      <Text
                        key={index}
                        borderWidth="1px"
                        borderColor={skill.colorScheme}
                        borderRadius="md"
                        p={1}
                      >
                        {skill.name}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>

  );
};

export default Skills;