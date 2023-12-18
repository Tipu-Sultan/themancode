import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../index";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
import Layout from "../components/Layout";


const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [loader, setLoader] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btnsArray = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max']


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);

        setCoin(data);
        setChartArray(chartData.prices)
      } catch (error) {
        toast.error("Error while fetching coin", {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setLoader(false);
      }
    };

    fetchCoin();
  }, [id, days, currency]);

  return (
    <Layout title={'coins-details'}>
      <Container maxW={"container.xl"} mt={100}>
        {loader ? (
          <center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"

            />
          </center>

        ) : (
          <>
            <Box borderWidth={1} width={"full"}>
              <Chart arr={chartArray} days={days} currency={currency} chartType="line" />
            </Box>

            <HStack p={'4'} wrap={'wrap'}>
              {
                btnsArray.map((btn, i) => (
                  <Button key={i} onClick={() => setDays(btn)}>{btn}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value="inr">₹ INR</Radio>
                <Radio value="eur">€ EUR</Radio>
                <Radio value="usd">$ USD</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                Last Update On {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image
                src={coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {coin.market_data.current_price[currency]
                    ? coin.market_data.current_price[currency].toLocaleString(
                      "en-IN",
                      { style: "currency", currency: `${currency}` }
                    )
                    : "Price not available"}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h} %
                </StatHelpText>
              </Stat>
              <Badge>{`# ${coin.market_cap_rank}`}</Badge>

              <CustomBar
                high={
                  coin.market_data.high_24h[currency] ?
                    coin.market_data.high_24h[currency].toLocaleString(
                      "en-IN",
                      { style: "currency", currency: `${currency}` }
                    ) : '24 Hours not available'}
                low={
                  coin.market_data.low_24h[currency] ?
                    coin.market_data.low_24h[currency].toLocaleString("en-IN", {
                      style: "currency",
                      currency: `${currency}`,
                    }) : '24 Hours not available'}
              />

              <Box w={"full"} p={"4"}>
                <Item
                  title={"Max Supply"}
                  value={coin.market_data.max_supply ? coin.market_data.max_supply.toLocaleString("en-IN", {
                    style: "currency",
                    currency: `${currency}`,
                  }) : 'Max supply not available'}
                />
                <Item
                  title={"Circulating Supply"}
                  value={
                    coin.market_data.circulating_supply ?
                      coin.market_data.circulating_supply.toLocaleString(
                        "en-IN",
                        { style: "currency", currency: `${currency}` }
                      ) : 'Circulating Supply not available'}
                />
                <Item
                  title={"Market Capital"}
                  value={
                    coin.market_data.market_cap[currency] ?
                      coin.market_data.market_cap[currency].toLocaleString(
                        "en-IN",
                        { style: "currency", currency: `${currency}` }
                      ) : 'Market Capital not available'}
                />
                <Item
                  title={"All Time Low"}
                  value={
                    coin.market_data.atl[currency] ?
                      coin.market_data.atl[currency].toLocaleString(
                        "en-IN",
                        { style: "currency", currency: `${currency}` }
                      ) : 'ATL not available'}
                />
                <Item
                  title={"All Time High"}
                  value={
                    coin.market_data.ath[currency] ?
                      coin.market_data.ath[currency].toLocaleString(
                        "en-IN",
                        { style: "currency", currency: `${currency}` }
                      ) : 'ATH not available'}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </Layout>
  );
};

const Item = ({ value, title }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={"50"} colorScheme="teal" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text>24H Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
