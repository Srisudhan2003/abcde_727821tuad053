import React, { useState } from 'react';

function EditProductCategoryModal({ editedCategory, onSubmit, onClose }) {
  const [editedFields, setEditedFields] = useState(editedCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields({ ...editedFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedFields);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-black bg-opacity-40 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-md shadow-md z-20">
        <h2 className="text-2xl font-semibold mb-4">Edit Product Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Category Name:</label>
            <input
              type="text"
              name="categoryName"
              value={editedFields.categoryName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Category Description:</label>
            <input
              type="text"
              name="categoryDescription"
              value={editedFields.categoryDescription}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Category Image URL:</label>
            <input
              type="text"
              name="categoryImage"
              value={editedFields.categoryImage}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductCategoryModal;
