import React, { useState } from 'react';
import axios from 'axios';

function PaymentButton({ orderId, amount, customerName, customerPhone }) {
  const [paymentUrl, setPaymentUrl] = useState('');

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/payment/initial', {
        orderId,
        amount,
        customerName,
        customerPhone
      });
      setPaymentUrl(response.data.paymentUrl);
    } catch (err) {
      console.error('Error initiating payment', err);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Pay Now</button>
      {paymentUrl && <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Complete Payment</a>}
    </div>
  );
}

export default PaymentButton;
