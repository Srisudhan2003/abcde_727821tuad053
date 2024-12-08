import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from './SideBar';

const ViewCustomerPage = () => {
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const customerData = response.data.filter(user => user.role === 'CUSTOMER');
      setCustomers(customerData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <DefaultSidebar />

      <div className="flex-grow p-8 pl-[20rem]">
        <h1 className="text-3xl mb-6 font-bold text-gray-800">View Customers</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-md text-gray-800">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase">
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-100 text-sm">
                  <td className="py-2 px-4">{user.firstName}</td>
                  <td className="py-2 px-4">{user.lastName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerPage;
