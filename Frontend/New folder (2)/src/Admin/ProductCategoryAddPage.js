import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { DefaultSidebar } from './SideBar';
import axios from 'axios';

function AddProductCategoryPage() {
  const [category, setCategory] = useState({
    categoryName: '',
    categoryImage: '',
    categoryDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/productcategory', category, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setCategory({
          categoryName: '',
          categoryImage: '',
          categoryDescription: '',
        });

        toast.success('Product category added successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error('Failed to add product category. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error adding product category:', error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="flex">
      <DefaultSidebar />
      <div className="flex-grow pl-[20rem]">
        <div className="p-6">
          <Toaster />
          <h2 className="text-2xl mb-4 font-bold text-blue-700">Add a Product Category</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Category Name:</label>
              <input
                type="text"
                name="categoryName"
                value={category.categoryName}
                onChange={handleChange}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Category Image URL:</label>
              <input
                type="text"
                name="categoryImage"
                value={category.categoryImage}
                onChange={handleChange}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Category Description:</label>
              <input
                type="text"
                name="categoryDescription"
                value={category.categoryDescription}
                onChange={handleChange}
                className="border border-gray-400 p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Product Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductCategoryPage;
