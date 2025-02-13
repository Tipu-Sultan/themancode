import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@chakra-ui/react';

const PaymentComponent = () => {
  const [amount, setAmount] = useState(150); // amount in INR
  const [btnEnable, setBtnEnable] = useState(false);


  const handlePayment = async () => {
    try {
      setBtnEnable(true)
      // Create a new order
      const { data: order } = await axios.post('http://localhost:8080/api/payment/create-order', {
        amount: amount,
        currency: 'INR',
        receipt: 'receipt#1',
      });

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Tipu Sultan',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          const paymentData = {
            order_id: order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          // Verify the payment on the server
          const { data } = await axios.post('http://localhost:8080/api/payment/verify-payment', paymentData);

          if (data.success) {
            alert('Payment successful and verified!');
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setBtnEnable(false)
      console.error('Payment error:', error);
      alert('Something went wrong with the payment process');
    }
  };

  return (
    <div>
      <Button
        isDisabled={btnEnable}
        mr={3}
        mt={5}
        colorScheme="teal"
        onClick={handlePayment}
      >
        Pay By Razorpay ₹{amount}
      </Button>
    </div>
  );
};

export default PaymentComponent;
