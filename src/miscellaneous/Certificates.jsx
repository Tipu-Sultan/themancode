import { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  IconButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  Container,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import Layout from "../components/Layout";
import html from "../assets/html.png";
import java from "../assets/basicJava.png";
import python from "../assets/Tipu_Sultan_1.jpg";
import ml from "../assets/Tipu_Sultan_1.jpg";
import ds from "../assets/Tipu_Sultan_1.jpg";


const Certificates = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCertificate, setSelectedCertificate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Certificate data with categories
  const certificates = [
    { category: "python", image: python },
    { category: "python", image: ml },
    { category: "python", image: ds },
    { category: "java", image: java },
    { category: "html", image: html },
  ];

  // Filter certificates based on the selected category
  const filteredCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  return (
    <Layout title="Certificates">
      <Container maxW="container.xl" mt={20}>
        <Tabs>
          <TabList>
            <Tab onClick={() => setSelectedCategory("all")}>All Certificates</Tab>
            <Tab onClick={() => setSelectedCategory("python")}>Python</Tab>
            <Tab onClick={() => setSelectedCategory("java")}>Java</Tab>
            <Tab onClick={() => setSelectedCategory("html")}>HTML</Tab>
          </TabList>
        </Tabs>

        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {filteredCertificates.map((cert, index) => (
            <GridItem key={index} colSpan={1} position="relative">
              <Image
                src={cert.image}
                alt={`Certificate ${index + 1}`}
                width="100%"
                height="auto"
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                onClick={() => {
                  setSelectedCertificate(cert.image);
                  onOpen();
                }}
              />
              <IconButton
                icon={<FaEye />}
                aria-label="View Certificate"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="black"
                opacity={0} // Initially hidden
                transition="opacity 0.3s ease-in-out"
                _hover={{ opacity: 1 }}
                onClick={() => {
                  setSelectedCertificate(cert.image);
                  onOpen();
                }}
                display={isOpen ? "none" : "block"}
                fontSize="3xl" 
              />
            </GridItem>
          ))}
        </Grid>

        {/* Modal for displaying the selected certificate in a larger view */}
        <Modal isOpen={isOpen} onClose={onClose} size="3xl"> {/* Increase modal size */}
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Image src={selectedCertificate} alt="Certificate" width="100%" height="auto" />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Layout>
  );
};

export default Certificates;
