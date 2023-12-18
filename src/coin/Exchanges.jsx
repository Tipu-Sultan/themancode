import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import {
  Container,
  Spinner,
  Text,
  Image,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true); // Show loader initially

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get(`${server}/exchanges`);
        setExchanges(response.data);
      } catch (error) {
        toast.error("Data fetching failed...", {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setLoader(false); // Hide loader after API call is completed
      }
    };

    fetchExchanges();
  }, []);

  return (
    <Layout title={'exchanges'}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {loader ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Container maxW={"container.xl"} mt={20}>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((item, i) => (
            <ExchangeCard
              key={i}
              name={item.name}
              img={item.image}
              rank={item.trust_score_rank}
              url={item.url}
            />
          ))}
        </HStack>
        </Container>
      )}
    </div>
    </Layout>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="blank">
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
      boxShadow="0 4px 6px rgba(255, 140, 0, 0.1)"
    _hover={{
      boxShadow: "0 6px 12px rgba(255, 140, 0, 0.25)",
    }}
    >
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt="Exchange" />
      <Heading size={"md"} noOfLines={"1"}>
        {rank}
      </Heading>
      <Text noOfLines={"1"}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
