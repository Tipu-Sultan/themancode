import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import beepSound from '../beep.mp3';
const CoinCard = ({ name, img, symbol, price, id, currency }) => {
  let num = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: `${currency}`,
  });

  const [audio] = useState(new Audio(beepSound));

  useEffect(() => {
    audio.load();
  }, [audio]);

  // const playBeep = () => {
  //   audio.play();
  // };

  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={'52'}
        shadow={'lg'}
        p={'8'}
        borderRadius={'lg'}
        transition={'all 0.3s'}
        m={'4'}
        css={{
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
        boxShadow="0 4px 6px rgba(255, 140, 0, 0.5)"
        _hover={{
          boxShadow: '0 6px 12px rgba(255, 140, 0, 0.50)',
        }}
        // onMouseEnter={playBeep}
      >
        <Image
          src={img}
          w={'10'}
          h={'10'}
          objectFit={'contain'}
          alt="Exchange"
        />
        <Heading size={'md'} noOfLines={'1'}>
          {symbol}
        </Heading>
        <Text noOfLines={'1'}>{name}</Text>
        <Text noOfLines={'1'}>{`${num}`}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
