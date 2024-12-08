import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DefaultSidebar } from './SideBar';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pg/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Error fetching payments. Please try again later.');
      }
    };

    fetchPayments();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <DefaultSidebar />

      <div className="flex-grow p-8 pl-[20rem]">
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment List</h1>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase">
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Razorpay Order ID</th>
                <th className="py-3 px-4 border-b">Secret Key</th>
                <th className="py-3 px-4 border-b">Secret ID</th>
                <th className="py-3 px-4 border-b">Payment Gateway Name</th>
                <th className="py-3 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .filter(payment => (
                  payment.id &&
                  payment.razorpayOrderId &&
                  payment.secretKey &&
                  payment.secretId &&
                  payment.pgName &&
                  payment.amount
                ))
                .map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-100 text-sm">
                    <td className="py-2 px-4 border-b">{payment.id}</td>
                    <td className="py-2 px-4 border-b">{payment.razorpayOrderId}</td>
                    <td className="py-2 px-4 border-b">{payment.secretKey}</td>
                    <td className="py-2 px-4 border-b">{payment.secretId}</td>
                    <td className="py-2 px-4 border-b">{payment.pgName}</td>
                    <td className="py-2 px-4 border-b">{payment.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
