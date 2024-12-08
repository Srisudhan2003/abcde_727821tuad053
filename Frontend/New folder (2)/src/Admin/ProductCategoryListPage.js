import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from './SideBar';
import EditProductCategoryModal from './EditProductCategoryModal';

function ProductCategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productcategory', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/productcategory/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCategories(categories.filter(category => category.categoryId !== categoryId));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`Category with ID ${categoryId} not found.`);
      } else {
        console.error('Error removing product category:', error);
      }
    }
  };

  const handleEditClick = (category) => {
    setEditedCategory(category);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (editedFields) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/productcategory/${editedCategory.categoryId}`, editedFields, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCategories(categories.map(c => (c.categoryId === editedCategory.categoryId ? response.data : c)));
      setIsModalOpen(false);
      setEditedCategory(null);
    } catch (error) {
      console.error('Error editing product category:', error);
    }
  };

  return (
    <div className="flex mr-8">
      <DefaultSidebar />
      <div className="flex-grow pl-[20rem]">
        <div>
          <h2 className="text-2xl font-bold pt-10 text-yellow-700 mb-4">Available Product Categories</h2>
          {categories.length === 0 ? (
            <div className="text-center text-gray-500">No product categories available</div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map(category => (
                <div key={category.categoryId} className="border p-4 rounded-md shadow-md">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <h3 className="text-xl font-semibold mb-2">{category.categoryName}</h3>
                  <p className="mb-2">Description: {category.categoryDescription}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => handleRemoveCategory(category.categoryId)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleEditClick(category)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {editedCategory && (
          <EditProductCategoryModal
            isOpen={isModalOpen}
            editedCategory={editedCategory}
            onSubmit={handleEditSubmit}
            onClose={() => {
              setIsModalOpen(false);
              setEditedCategory(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProductCategoryListPage;
