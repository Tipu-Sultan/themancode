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
} from '@chakra-ui/react';
import mylogo from '../assets/myself.png';
import { useEffect, useState } from 'react';
import './main.css'
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaRocket,
  FaFile
} from 'react-icons/fa';

export default function CallToActionWithAnnotation() {
  const [isMobile] = useMediaQuery("(max-width: 794px)");

  const socialButtons = [
    {
      text: 'Preview Resume',
      url: 'https://drive.google.com/file/d/1AruNdk4MNVNKgDRO_hdKr381K5a8ZcKs/view?usp=sharing',
      icon: FaFile,
      style: {
        color: 'rgba(var(--text-color))',
        border: '2px double transparent',
        backgroundImage: 'linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)), radial-gradient(circle at left top, rgb(1, 110, 218), rgb(217, 0, 192))',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: 'rgba(var(--primary-color), 0.5) 0px 0px 20px 0px'
      },
    },
    {
      text: 'GitHub',
      url: 'https://github.com/Tipu-Sultan',
      icon: FaGithub,
      color: '#fff',
    },
    {
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tipu-sultan-47b4221b4/',
      icon: FaLinkedin,
      color: '#0e76a8', // Add the color for LinkedIn
    },
    {
      text: 'Vercel',
      url: 'https://vercel.com/tipu-sultan',
      icon: FaRocket,
      color: '#000000', // Add the color for Vercel
    },
    {
      text: 'Instagram',
      url: 'https://www.instagram.com/pathan__sultan/',
      icon: FaInstagram,
      color: '#bc2a8d', // Add the color for Instagram
    },
    {
      text: 'Gmail',
      url: 'mailto:teepukhan729@gmail.com',
      icon: FaEnvelope,
      color: '#dd4b39', // Add the color for Gmail
    },
  ];

  const sentences = [
    "I'm a MERN Dev.",
    "I'm a web Dev.",
    'Freelancer.',
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const typewriterInterval = 200; // Interval in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSentenceIndex < sentences.length) {
        const sentence = sentences[currentSentenceIndex];
        if (currentWordIndex < sentence.length) {
          setCurrentText(prevText => prevText + sentence[currentWordIndex]);
          setCurrentWordIndex(prevIndex => prevIndex + 1);
        } else {
          setCurrentText('');
          setCurrentWordIndex(0);
          setCurrentSentenceIndex(prevIndex => prevIndex + 1);
        }
      } else {
        setCurrentSentenceIndex(0);
      }
    }, typewriterInterval);

    return () => clearInterval(interval);
  }, [currentSentenceIndex, currentWordIndex]);

  return (
    <>
      <Container maxW={{ base: '100%', md: '80%' }}>
        <Stack
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          spacing={{ base: '8', md: '14', lg: '15', xl: '40' }}
          py={{ base: 100, md: 20, lg: 36 }}
        >
          {/* Left side: Heading and Text */}
          <Box
            flex={{ base: '1', md: '1', lg: '1' }}
            textAlign={{ base: 'center', md: 'left' }}
            mb={{ base: 8, md: 0 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
              lineHeight={'110%'}
              mb={{ base: 6, md: 8 }}
            >
              <span
                style={{
                  color: '#bc2a8d',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                Hi
              </span>
              , I'm Tipu Sultan <br />
              <Text as={'span'} color={'green.400'}>
                {currentText}
                <span
                  style={{ borderRight: '2px solid', marginLeft: '4px' }}
                ></span>{' '}
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', md: 'md' }}>
              <span
                style={{
                  color: '#bc2a8d',
                  fontSize: '15px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                I have
              </span>{' '}
              extensive knowledge in web development and an impressive track record of building various minor and major projects,
              including an e-commerce website, an online voting portal, participation in iulhackathon2022, a chatroom application, and a
              Netflix clone. I have also tested two Android apps, demonstrating my adaptability across platforms. My skill set encompasses
              MERN JS, HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, GitHub, MongoDB, and MySQL. I am also well-versed in JAVA with DSA
              and OOPS. and my hobbies are Coding, reading, and playing cricket, which further fuel my passion for continuous learning and
              well-rounded development as a software developer.


            </Text>
          </Box>

          {/* Right side: Image */}
          <Box
            flex={{ base: '1', md: '1', lg: '1' }}
            textAlign={{ base: 'center', md: 'right' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxW={{ base: '100%', md: '450' }}
            mb={{ base: 8, md: 0 }}
            className={isMobile ? '' : 'fancyborderradius'}
          >
            <Image
              src={mylogo}
              alt={mylogo}
              borderRadius={isMobile ? 'full' : 'inherit'}
              maxH={{ base: '300px', md: '400px' }}
            />
          </Box>
        </Stack>
        <Center>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 8 }}
            mb={10}
          >
            <HStack
              mb={{ base: 6, md: 0 }}
              wrap={'wrap'}
              justify={{ base: 'center', md: 'left' }}
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
                  _hover={{ color: 'white' }}
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

