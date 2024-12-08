import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

function InvoiceComponent() {
  const uid = localStorage.getItem('uid');
  const userId = uid;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);

  const generateQRCode = async (product) => {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, product, { width: 50, height: 50 });
    return canvas.toDataURL('image/jpeg');
  };

  const generateInvoice = async () => {
    const pdfDoc = new jsPDF();

    pdfDoc.setFontSize(18);
    pdfDoc.text('Invoice', 105, 15, 'center');

    pdfDoc.setFontSize(12);
    pdfDoc.text(`Order Date: ${new Date().toLocaleDateString()}`, 105, 25, 'center');

    let y = 45;
    for (const item of cartItems) {
      const productQRCode = await generateQRCode(JSON.stringify(item));

      pdfDoc.addImage(item.productImage, 'JPEG', 20, y, 30, 30);
      pdfDoc.text(`Product Name: ${item.productName}`, 60, y + 10);
      pdfDoc.text(`Quantity: ${item.quantity}`, 60, y + 20);
      pdfDoc.text(`Price: ₹ ${item.productPrice}`, 60, y + 30);

      pdfDoc.addImage(productQRCode, 'JPEG', 150, y, 20, 20);

      y += 60;
    }

    pdfDoc.setFontSize(14);
    pdfDoc.text(`Total: ₹ ${totalCost}`, 105, y + 20, 'center');

    pdfDoc.save('invoice.pdf');
  };

  useEffect(() => {
    const fetchData = async () => {
      const bearerToken = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/cart`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const cartItemsArray = Array.isArray(data.cartItems) ? data.cartItems : [];
        setCartItems(cartItemsArray);

        // Calculate total cost
        const total = cartItemsArray.reduce(
          (acc, item) => acc + item.productPrice * item.quantity,
          0
        );
        setTotalCost(total);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Dependency array with userId

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-8 rounded-md shadow-md w-96">
        <h2 className="text-4xl font-bold mb-5">Invoice</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="mb-4 flex items-center">
            <img src={item.productImage} alt="Product" width={50} height={50} className="mr-4" />
            <div>
              <p className="font-bold">{item.productName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹ {item.productPrice}</p>
            </div>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">₹ {totalCost}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="w-full rounded-md bg-yellow-500 py-2 font-medium text-blue-50 hover:bg-yellow-600"
          onClick={generateInvoice}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
}

export default InvoiceComponent;
