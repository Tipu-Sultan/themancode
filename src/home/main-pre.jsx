import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    HStack,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaEnvelope,
    FaRocket,
  } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  
  export default function CallToActionWithAnnotation() {
    const socialButtons = [
      {
        text: 'GitHub',
        url: 'https://github.com/Tipu-Sultan',
        icon: FaGithub,
        color: '#171515', // Add the color for GitHub
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
      "I'm a react developer  .",
      "I'm a web developer.",
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
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
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
                {/* Pipe bar */}
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              <span
                style={{
                  color: '#bc2a8d',
                  fontSize: '15px',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                }}
              >
                I possess
              </span>{' '}
              extensive knowledge in web development and have an impressive track
              record of building various minor and major projects, including an
              e-commerce website, an online voting portal, participation in
              iulhackathon2022, a chatroom application, and a Netflix clone. I
              have also tested two Android apps, demonstrating my adaptability
              across platforms. My skill set encompasses MERN JS, HTML, CSS,
              JavaScript, Bootstrap, Tailwind CSS, GitHub, MongoDB, and MySQL. I
              am also well-versed in JAVA with DSA and OOPS. Coding, reading, and
              playing cricket are my hobbies, which further fuel my passion for
              continuous learning and well-rounded development as a software
              developer.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                <Link
                  to={
                    'https://drive.google.com/file/d/1AruNdk4MNVNKgDRO_hdKr381K5a8ZcKs/view?usp=sharing'
                  }
                  target="_blank"
                >
                  Preview Resume
                </Link>
              </Button>
            </Stack>
            <HStack p={'4'} wrap={'wrap'} justify={'center'}>
              {' '}
              {/* Center the icons */}
              {socialButtons.map((btn, i) => (
                <Button
                  key={i}
                  as="a"
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<btn.icon />}
                  color={btn.color} // Set the color scheme for the button
                  _hover={{ color: 'white' }} // Change color to white on hover
                >
                  {btn.text}
                </Button>
              ))}
            </HStack>
          </Stack>
        </Container>
      </>
    );
  }
  