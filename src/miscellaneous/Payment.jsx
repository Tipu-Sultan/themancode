import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Image, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import myQRCode from '../assets/themancode-qr.png'
import Layout from '../components/Layout'
const DonationComponent = () => {
    const HOST = process.env.REACT_APP_API_HOST
    const [qrCode, setQrCode] = useState(null);
    const [timer, setTimer] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);


    const generateQrCode = async () => {
        try {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const expirationTimestamp = currentTimeInSeconds + 5 * 60;
            if (expirationTimestamp) {
                const timeRemaining = expirationTimestamp - currentTimeInSeconds;

                setQrCode(myQRCode);
                setTimer(Math.max(0, timeRemaining));

                const countdown = setInterval(() => {
                    setTimer((prevTimer) => {
                        if (prevTimer === 0) {
                            clearInterval(countdown);
                            setQrCode(null);
                        }
                        return Math.max(0, prevTimer - 1);
                    });
                }, 1000);
            } else {
                console.error('Invalid expiration timestamp received from the server.');
            }
        } catch (error) {
            console.error('Error generating QR Code:', error);
        }
    };



    return (
        <Layout>
            <Box
                p={4}
                mt={100}
                w={{ base: '90%', sm: '80%', md: '60%', lg: '70%' }}
                mx="auto"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                textAlign="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <RadioGroup mb={5} onChange={(value) => setSelectedPaymentMethod(value)}>
                    <Stack spacing={2} direction={{ base: 'column', sm: 'row' }}>
                        <Radio value="upi">UPI</Radio>
                    </Stack>
                </RadioGroup>
                {selectedPaymentMethod === 'upi' &&
                    <Button mr={3} colorScheme="teal"  onClick={generateQrCode}>
                        Generate UPI QR Code
                    </Button>
                }
                {qrCode && <Text mt={5}>Time remaining: {Math.floor(timer / 60)}:{timer % 60}</Text>}

                {qrCode && selectedPaymentMethod === 'upi' && (
                    <Image
                        src={myQRCode}
                        alt="UPI QR Code"
                        borderRadius="md"
                        display="block"
                        w={361}
                        h={500}
                        mt={4}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                )}

            </Box>
        </Layout>

    );
};

export default DonationComponent;
