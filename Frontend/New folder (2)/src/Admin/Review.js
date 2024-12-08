import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from './SideBar';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8080/api/productreviews', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setReviews(response.data);
        } else {
          console.error('Failed to fetch reviews. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex">
      <DefaultSidebar />

      <div className="ml-[20rem] p-8 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Reviews</h2>

        <ul className="divide-y divide-gray-300">
          {reviews.map(review => (
            <li key={review.reviewId} className="py-4">
              <div className="mb-2">
                <strong className="text-gray-600">User:</strong> {review.user.username}
              </div>
              <div className="mb-2">
                <strong className="text-gray-600">Rating:</strong> {review.rating}
              </div>
              <div>
                <strong className="text-gray-600">Comment:</strong> {review.comment}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewList;
