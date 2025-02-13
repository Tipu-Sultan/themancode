import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Image,
  HStack,
  Center,
  useMediaQuery,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import mylogo from "../assets/myself.png";
import { useEffect, useState } from "react";
import "./main.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaRocket,
  FaFile,
  FaHeart,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export default function CallToActionWithAnnotation() {
  const [isMobile] = useMediaQuery("(max-width: 794px)");
  const Color = useColorModeValue("gray.900", "gray.100");

  const socialButtons = [
    {
      text: "Preview Resume",
      url: "https://drive.google.com/file/d/17lWlTVwiXH4SPv2JbmUnrPC7VTctbdiK/view?usp=sharing",
      icon: FaFile,
      style: {
        color: "#fff",
        border: "2px double transparent",
        backgroundImage:
          "linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)), radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: "rgba(var(--primary-color), 0.5) 0px 0px 20px 0px",
      },
    },
    {
      text: "GitHub",
      url: "https://github.com/Tipu-Sultan",
      icon: FaGithub,
      color: Color,
    },
    {
      text: "LinkedIn",
      url: "https://www.linkedin.com/in/tipu-sultan-47b4221b4/",
      icon: FaLinkedin,
      color: "#0e76a8",
    },
    {
      text: "Vercel",
      url: "https://vercel.com/tipu-sultan",
      icon: FaRocket,
      color: "#000000",
    },
    {
      text: "Instagram",
      url: "https://www.instagram.com/pathan__sultan/",
      icon: FaInstagram,
      color: "#bc2a8d",
    },
    {
      text: "Gmail",
      url: "mailto:teepukhan729@gmail.com",
      icon: FaEnvelope,
      color: "#dd4b39",
    },
  ];

  const sentences = ["I'm a MERN Dev.", "I'm a web Dev.", "Freelancer."];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  const typewriterInterval = 200;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSentenceIndex < sentences.length) {
        const sentence = sentences[currentSentenceIndex];
        if (currentWordIndex < sentence.length) {
          setCurrentText((prevText) => prevText + sentence[currentWordIndex]);
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          setCurrentText("");
          setCurrentWordIndex(0);
          setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setCurrentSentenceIndex(0);
      }
    }, typewriterInterval);

    return () => clearInterval(interval);
  }, [currentSentenceIndex, currentWordIndex]);

  return (
    <>
      <Container maxW={{ base: "100%", md: "80%" }}>
        <Stack
          direction={{ base: "column", md: "column", lg: "row" }}
          spacing={{ base: "8", md: "14", lg: "15", xl: "40" }}
          py={{ base: 100, md: 20, lg: 36 }}
        >
          <Box
            flex={{ base: "1", md: "1", lg: "1" }}
            textAlign={{ base: "center", md: "left" }}
            mb={{ base: 8, md: 0 }}
          >
            <Button
              colorScheme="teal"
              size="md"
              leftIcon={<Icon as={FaHeart} color={"red"} />}
              _hover={{ bg: "yellow.400" }}
              as={RouterLink}
              to="/donateforme"
            >
              Donate for code
            </Button>
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "5xl" }}
              lineHeight={"110%"}
              mb={{ base: 6, md: 8 }}
            >
              <span
                style={{
                  color: "#bc2a8d",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                Hi
              </span>
              , I'm Tipu Sultan <br />
              <Text as={"span"} color={"green.400"}>
                {currentText}
                <span
                  style={{ borderRight: "2px solid", marginLeft: "4px" }}
                ></span>{" "}
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", md: "md" }}>
              <span
                style={{
                  color: "#bc2a8d",
                  fontSize: "15px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                I am
              </span>{" "}
              motivated and skilled Full-Stack Developer with a strong
              foundation in designing and developing scalable web applications.
              I have worked on projects like a UP Police Crime Record Management
              System and a real-time social media platform with features like
              messaging, video calls, and authentication. My technical expertise
              includes MERN stack (MongoDB, Express.js, React.js, Node.js),
              Next.js, Redux Toolkit, Laravel, and PHP, along with MySQL,
              JavaScript,Tailwind CSS, Bootstrap, and API integrations. I am
              also proficient in Data Structures, Object-Oriented Programming. I
              am participate in college coding challenges and hackathons,
              including IUL Hackathon 2022, showcasing my problem-solving skills
              and adaptability. Passionate about continuous learning and
              innovation, I enjoy exploring new technologies, reading, and
              playing cricket.
            </Text>
          </Box>

          <Box
            flex={{ base: "1", md: "1", lg: "1" }}
            textAlign={{ base: "center", md: "right" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxW={{ base: "100%", md: "450" }}
            mb={{ base: 8, md: 0 }}
            className={isMobile ? "" : "fancyborderradius"}
          >
            <Image
              src={mylogo}
              alt={mylogo}
              borderRadius={isMobile ? "full" : "inherit"}
              maxH={{ base: "300px", md: "400px" }}
            />
          </Box>
        </Stack>
        <Center>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 8, md: 8 }}
            mb={10}
          >
            <HStack
              mb={{ base: 6, md: 0 }}
              wrap={"wrap"}
              justify={{ base: "center", md: "left" }}
              spacing={{ base: 8, md: 8 }}
            >
              {socialButtons.map((btn, i) => (
                <Button
                  key={i}
                  as="a"
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<btn.icon />}
                  color={btn.color}
                  _hover={{ color: "white" }}
                  style={btn.style}
                >
                  {btn.text}
                </Button>
              ))}
            </HStack>
          </Stack>
        </Center>
      </Container>
    </>
  );
}
