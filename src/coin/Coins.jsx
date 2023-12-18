import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Container, Spinner, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoinCard from "./CoinCard";
import Layout from "../components/Layout";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(response.data);
      } catch (error) {
        toast.error("Data fetching failed...", {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setLoader(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= 132) {
      setPage(newPage);
      setLoader(true);
    }
  };

  const totalPages = 132; // Total number of pages
  const pagesPerSet = 10; // Number of pages to show in a set

  // Calculate the start and end pages for display
  const startPage = Math.floor((page - 1) / pagesPerSet) * pagesPerSet + 1;
  let endPage = startPage + pagesPerSet - 1;
  endPage = Math.min(endPage, totalPages);

  const displayedPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <Layout title={'coins || find your bits coins'}>
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
        <Container maxW={"container.xl"}>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="eur">€ EUR</Radio>
              <Radio value="usd">$ USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((item, i) => (
              <CoinCard
                key={i}
                id={item.id}
                name={item.name}
                img={item.image}
                price={item.current_price}
                symbol={item.symbol}
                currency={currency}
              />
            ))}
          </HStack>

          <HStack mt={4} mb={4}>
            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => changePage(page - pagesPerSet)}
              isDisabled={page <= pagesPerSet}
            >
              Previous
            </Button>

            {displayedPages.map((pageNumber) => (
              <Button
                key={pageNumber}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(pageNumber)}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </Button>
            ))}

            <Button
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => changePage(page + pagesPerSet)}
              isDisabled={page + pagesPerSet > totalPages}
            >
              Next
            </Button>
          </HStack>
        </Container>
      )}
    </div>
    </Layout>
  );
};

export default Coins;
