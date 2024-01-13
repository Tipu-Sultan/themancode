import React, { useState } from 'react';
import { Box, Button, Image, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import qrcode from 'qrcode';
import { createCanvas } from 'canvas';
import Layout from '../components/Layout';


const DonationComponent = () => {
    const [qrCodeData, setQrCodeData] = useState(null);
    const [timer, setTimer] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [btnEnable, setBtnEnable] = useState(null);
    const [showExpiredMessage, setShowExpiredMessage] = useState(false);

    const generateQrCode = async (upiId) => {
        try {
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const expirationTimestamp = currentTimeInSeconds + 5 * 60;

            if (expirationTimestamp) {
                const timeRemaining = expirationTimestamp - currentTimeInSeconds;
                setTimer(Math.max(0, timeRemaining));
                setBtnEnable(true);
                setShowExpiredMessage(false);

                const countdown = setInterval(() => {
                    setTimer((prevTimer) => {
                        if (prevTimer === 0) {
                            clearInterval(countdown);
                            setQrCodeData(null);
                            setBtnEnable(false);
                            setShowExpiredMessage(true);
                        }
                        return Math.max(0, prevTimer - 1);
                    });
                }, 1000);

                const canvas = createCanvas();
                await qrcode.toCanvas(canvas, `upi://pay?pa=${upiId}&tid=${currentTimeInSeconds}&tn=Donate For Me&am=150&cu=INR`);
                const dataUrl = canvas.toDataURL();
                setQrCodeData(dataUrl);

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

                {selectedPaymentMethod === 'upi' && (
                    <>
                        <Button
                            isDisabled={btnEnable}
                            mr={3}
                            colorScheme="teal"
                            onClick={() => generateQrCode('9919408817@ybl')}
                        >
                            Generate UPI QR Code
                        </Button>

                        {showExpiredMessage && (
                            <Text mt={3} color="red.400">
                                The QR code has expired. Please generate a new one.
                            </Text>
                        )}
                    </>
                )}

                {qrCodeData && !showExpiredMessage && (
                    <Text mt={5}>Time remaining: {Math.floor(timer / 60)}:{timer % 60}</Text>
                )}
                {selectedPaymentMethod === 'upi' && qrCodeData && (
                    <Image
                        src={qrCodeData}
                        alt="UPI QR Code"
                        borderRadius="md"
                        display="block"
                        mt={4}
                        w={400}
                        h={400}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default DonationComponent;
