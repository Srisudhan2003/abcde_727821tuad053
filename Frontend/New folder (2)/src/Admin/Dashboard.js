import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DefaultSidebar } from './SideBar';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersResponse = await axios.get('http://localhost:8080/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (usersResponse.status === 200) {
            const customerCount = usersResponse.data.filter(user => user.role === 'CUSTOMER').length;
            setTotalCustomers(customerCount);
          } else {
            console.error('Failed to fetch user data. Please try again.');
          }
  
          // Fetch total products
          const productsResponse = await axios.get('http://localhost:8080/api/products', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (productsResponse.status === 200) {
            setTotalProducts(productsResponse.data.length);
          } else {
            console.error('Failed to fetch product data. Please try again.');
          }
  
          // Fetch total reviews
          const reviewsResponse = await axios.get('http://localhost:8080/api/productreviews', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (reviewsResponse.status === 200) {
            setTotalReviews(reviewsResponse.data.length);
          } else {
            console.error('Failed to fetch review data. Please try again.');
          }
  
          // Fetch total payments
          const paymentsResponse = await axios.get('http://localhost:8080/pg/all', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (paymentsResponse.status === 200) {
            setTotalPayments(paymentsResponse.data.length);
          } else {
            console.error('Failed to fetch payment data. Please try again.');
          }
  
          // Fetch total orders
          const ordersResponse = await axios.get('http://localhost:8080/api/orders/all', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (ordersResponse.status === 200) {
            setTotalOrders(ordersResponse.data.length);
          } else {
            console.error('Failed to fetch order data. Please try again.');
          }

      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <DefaultSidebar />
      <div className="flex-grow pl-[20rem]">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Total Users */}
            <div className="dashboard-card bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h2>
              <span className="text-3xl font-bold text-blue-700">{totalCustomers}</span>
              <Link to="/users" className="block mt-2 text-blue-500 hover:underline">
                View Users
              </Link>
            </div>

            {/* Total Products */}
            <div className="dashboard-card bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Products</h2>
              <span className="text-3xl font-bold text-blue-700">{totalProducts}</span>
              <Link to="/ViewProducts" className="block mt-2 text-blue-500 hover:underline">
                View Products
              </Link>
            </div>

            {/* Total Reviews */}
            <div className="dashboard-card bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Reviews</h2>
              <span className="text-3xl font-bold text-blue-700">{totalReviews}</span>
              <Link to="/viewReviews" className="block mt-2 text-blue-500 hover:underline">
                View Reviews
              </Link>
            </div>

            {/* Total Payments */}
            <div className="dashboard-card bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Payments</h2>
              <span className="text-3xl font-bold text-blue-700">{totalPayments}</span>
              <Link to="/payment" className="block mt-2 text-blue-500 hover:underline">
                View Payments
              </Link>
            </div>

            {/* Total Orders */}
            <div className="dashboard-card bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Orders</h2>
              <span className="text-3xl font-bold text-blue-700">{totalOrders}</span>
              <Link to="/orderdetails" className="block mt-2 text-blue-500 hover:underline">
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
