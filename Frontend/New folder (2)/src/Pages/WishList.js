import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Navbar from './Navbar';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = localStorage.getItem('uid');

  const handleRemoveItem = async (wishlistId) => {
    try {
      await axios.delete(`http://localhost:8080/api/wishlist/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.wishlistId !== wishlistId)
      );
      toast.success('Item Removed from Wishlist');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const apiUrl = 'http://localhost:8080/api/users/addToCart';
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('uid');
      const response = await axios.post(
        apiUrl,
        {
          userId: userId,
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success('Item Added to Cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/wishlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const formattedWishlistItems = response.data.map((wishlistItem) => {
          const {
            wishlistId,
            product: {
              productId,
              productName,
              productPrice,
              productImage,
              brandName,
              productCategory: { categoryName },
              productQuantity,
              productDescription,
            },
          } = wishlistItem;

          return {
            wishlistId,
            productId,
            productName,
            productPrice,
            productImage,
            brandName,
            categoryName,
            productQuantity,
            productDescription,
          };
        });

        setWishlistItems(formattedWishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="py-12">
        <div className="hidden sm:flex flex-col justify-start items-start">
        <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
        <h1 className="text-4xl font-semibold leading-9 text-gray-800">Favourites</h1>
        <p className="text-base leading-4 text-gray-600 pb-1">({wishlistItems.length} Items)</p>
      </div>
      <table className="w-full mt-16 whitespace-nowrap">
        <thead aria-label="table heading" className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b ">
          <tr>
            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">YOUR PRODUCT</th>
            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">DESCRIPTION</th>
            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">PRICE</th>
            <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">MORE OPTIONS</th>
            <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
          </tr>
              </thead>
              <tbody className="w-full text-left">
                {wishlistItems.map((item) => (
                  <tr key={item.wishlistId} className="border-gray-200 border-b  ">
                    <th>
                      <img
                        src={item.productImage}
                        alt="productimage"
                        className="my-10 pl-4 lg:pl-10 2xl:pl-20 w-full rounded-lg sm:w-40"
                      />
                    </th>
                    <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                      <p className="text-base leading-4 text-gray-800">{item.productName}</p>
                    </th>
                    <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                      <p>${item.productPrice}</p>
                    </th>
                    <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20 ">
                      <button
                        onClick={() => handleRemoveItem(item.wishlistId)}
                        style={{ marginLeft: '72px' }}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800 pl-8"
                      >
                        <p>Remove Item</p>
                      </button>
                      <button
                        onClick={() => addToCart(item.productId)}
                        style={{ marginLeft: '12px' }}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 text-base leading-none text-green-600 hover:text-green-800 pl-4"
                      >
                        <p>Add to Cart</p>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" flex justify-center items-center">
          <div className="sm:hidden flex flex-col justify-start items-start ">
            <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
              <p className="text-4xl font-semibold leading-9 text-gray-800">Favourites</p>
              <p className="text-base leading-4 text-gray-600 pb-1">(12 Items)</p>
            </div>
            {wishlistItems.map((item) => (
              <div key={item.wishlistId} className="border-gray-200 border-b pb-10">
                <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                  <div>
                    <img
                      src={item.productImage}
                      alt="productimage"
                      className="w-full rounded-lg sm:w-40"
                    />
                  </div>
                </div>
                <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                  <div>
                    <p className="w-36 text-base leading-6 text-gray-800">{item.productName}</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold leading-4 text-gray-800">${item.productPrice}</p>
                  </div>
                </div>
                <div className="px-4 mt-6 justify-between w-full flex jusitfy-center items-center">
                  <div>
                    <button
                      onClick={() => handleRemoveItem(item.wishlistId)}
                      className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800"
                    >
                      <p>Remove Item</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
