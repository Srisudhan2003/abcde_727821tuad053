import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DefaultSidebar } from './SideBar';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders. Please try again later.');
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <DefaultSidebar />

      <div className="flex-grow p-8 pl-[20rem]">
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Order List</h1>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase">
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Card Holder Name</th>
                <th className="py-3 px-4 border-b">Billing Address</th>
                <th className="py-3 px-4 border-b">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(order => (
                  order.id &&
                  order.email &&
                  order.cardHolderName &&
                  order.billingAddress &&
                  order.orderStatus
                ))
                .map(order => (
                  <tr key={order.id} className="hover:bg-gray-100 text-sm">
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.email}</td>
                    <td className="py-2 px-4 border-b">{order.cardHolderName}</td>
                    <td className="py-2 px-4 border-b">{order.billingAddress}</td>
                    <td className="py-2 px-4 border-b">{order.orderStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
