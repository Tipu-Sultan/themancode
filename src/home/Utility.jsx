import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  Button,
  Progress,
} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { FaReact,FaNodeJs, FaDatabase} from 'react-icons/fa';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  const [showFullStory, setShowFullStory] = useState(false);

  const toggleFullStory = () => {
    setShowFullStory(!showFullStory);
  };

  const content = `During my high school years, I discovered an inspiring figure who changed my perspective on academics - Sundar Pichai.
   His achievements in the tech world lit a fire in me, driving me towards the fascinating field of core technology.
   Intrigued by how computers work, I dived into the digital world. I started by understanding the basics of how computers
    process information using '0s' and '1s', and gradually progressed to unraveling the complexities of networks and programming languages.
     My thirst for knowledge grew as I pursued a Bachelor's in Computer Applications (BCA), where I had the opportunity to learn various 
     programming languages like PHP, HTML, CSS, and Java. These languages allowed me to paint my understanding of the digital realm.
     As I delved deeper, I was captivated by the MERN stack, which elevated my understanding of software development. This curiosity
      led me to pursue a Master's in Computer Applications (MCA) from Integral University, Lucknow. Equipped with this postgraduate degree,
       I continued my journey in the software development realm, gaining a wealth of knowledge and experience. Inspired by Sundar Pichai's 
       footsteps, I stand today as a software enthusiast with a passion for creating and innovating in the dynamic world of technology.`;
  return (
    <Container maxW={'container.xl'} py={12} mt={5}>
      <hr />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={5}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Our Story
          </Text>
          <Heading>I'm a Software Developer.</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {showFullStory ? content : content.substring(0, 200) + '...'}
            <Button onClick={toggleFullStory} variant="link" color="blue.400">
              {showFullStory ? 'Read Less' : 'Read Full Story'}
            </Button>
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={<FaReact size={40} />}
              iconBg={useColorModeValue('blue.100', 'blue.900')}
              text={'React JS '}
              
            />
            <Progress
              value={'43'}
              colorScheme="yellow"
              w={'full'}
              borderRadius={'5px'}
            />
            <Feature
              icon={<FaNodeJs size={40} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Javascript '}
            />
            <Progress
              value={'58'}
              colorScheme="yellow"
              w={'full'}
              borderRadius={'5px'}
            />
            <Feature
              icon={<FaDatabase size={40} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'MongoDB'}
            />
            <Progress
              value={'36'}
              colorScheme="red"
              w={'full'}
              borderRadius={'5px'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
