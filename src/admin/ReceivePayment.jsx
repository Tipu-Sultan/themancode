import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const ReceivePayment = () => {
    const HOST = process.env.REACT_APP_API_HOST;
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch(`${HOST}/api/payment/getpayments`)
            .then((response) => response.json())
            .then((data) => setPayments(data))
            .catch((error) => console.error('Error fetching payment details:', error));
    }, []);

    const handleDelete = async (paymentId) => {
        try {
            const response = await fetch(`${HOST}/api/payment/${paymentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
            } else {
                console.error('Error deleting payment:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    return (
        <div>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>User ID</Th>
                        <Th>Transaction ID</Th>
                        <Th>UPI ID</Th>
                        <Th>Amount</Th>
                        <Th>Timestamp</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {payments.map((payment) => (
                        <Tr key={payment._id}>
                            <Td>{payment.user_id}</Td>
                            <Td>{payment.upiId}</Td>
                            <Td>{payment.tid}</Td>
                            <Td>{payment.amount}</Td>
                            <Td>{new Date(payment.timestamp).toLocaleString()}</Td>
                            <Td>
                                <Button colorScheme="red" onClick={() => handleDelete(payment._id)}>
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default ReceivePayment;
