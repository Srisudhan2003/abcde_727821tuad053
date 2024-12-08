import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignUpPage';
import Home from './Components/HomeComponents/Home';
import PrivacyPolicy from './Components/HomeComponents/PrivacyPolicy';
import CartPage from './Pages/CartPage';
import TandCpage from './Pages/T&Cpage';
import ContactUs from './Components/HomeComponents/ContactUs';
import ScrollToTop from './ScrollToTop';
import Shop from './Pages/Shop';
import AddProductPage from './Admin/ProductAddPage';
import ProductListPage from './Admin/ProductListPage'; 
import ViewCustomerPage from './Admin/ViewCustomerPage';
import AdminLogin from './Admin/AdminLogin';
import Dashboard from './Admin/Dashboard';
import CategoryTypes from './Components/Category/CategoryTypes'
import ProductListingHome from './Components/Category/ProductsListingHome'
import ProductDetailsList from './Components/Category/ProductDetailsList';
import AllProducts from './Components/Category/AllProducts'
import AboutUs from './Components/HomeComponents/AboutUs'
import FAQ from './Components/HomeComponents/FAQPage'
import Navbar from './Pages/Navbar'
import Razorpay from './Pages/RazorPayComponent'
import Checkout from './Pages/Checkout'
import Success from './Pages/Success'
import Fail from './Pages/Fail'
import WishList from "./Pages/WishList"
import ErrorPage from "./Components/HomeComponents/ErrorPage"
import Review from "./Admin/Review"
import PaymentPAGE from "./Admin/PaymentPAGE"
import OrderDETAILS from "./Admin/OrderDetails"
import ProductCategoryAdd from "./Admin/ProductCategoryAddPage"
import ProductCategoryListPage from "./Admin/ProductCategoryListPage"
import InvoiceComponent from "./Pages/InvoiceComponent";
import './App.css';
function App() {
  const role = localStorage.getItem('role');
  return (
    <BrowserRouter>
          <ScrollToTop />
          <Routes>
          {/*Login*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          {/*Home */}
          <Route path="/demo" element={<Navbar/>}/> 
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/category" element={<CategoryTypes />} /> 
            <Route path="/api/products/byCategory/:categoryId" element={<ProductListingHome />} />
            <Route path="/api/products/details/:productId" element={<ProductDetailsList />} />
            <Route path="/contactus" element={<ContactUs />} /> 
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/wishlist" element={<WishList />} /> 
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TandCpage />} /> 
            <Route path="/faq" element={<FAQ />} /> 
            <Route path="/admin" element={<AdminLogin />} />  
            <Route path="/pay" element={<Razorpay/>} />
            <Route path="/checkout" element={<Checkout/>} /> 
            <Route path="/success" element={<Success/>} /> 
            <Route path="/fail" element={<Fail/>} /> 
            <Route path="/invoice" element={<InvoiceComponent/>} /> 
          
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/addproducts" element={<AddProductPage />} />  
              <Route path="/viewproducts" element={<ProductListPage />} />
              <Route path="/addproductcategory" element={<ProductCategoryAdd />} />  
              <Route path="/viewproductcategory" element={<ProductCategoryListPage />} />
              <Route path="/viewreviews" element={<Review />} />
              <Route path="/users" element={<ViewCustomerPage />} />
              <Route path="/payment" element={<PaymentPAGE />} />
              <Route path="/orderdetails" element={<OrderDETAILS />} />
             
              {/*Extra*/}
              <Route path="/shop" element={<Shop />} />
              <Route path="/pd" element={<ProductListPage />} />
              <Route path="/errorpage" element={<ErrorPage />} />
          </Routes>
    </BrowserRouter>
  );
}
export default App;