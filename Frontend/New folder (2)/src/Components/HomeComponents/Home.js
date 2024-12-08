import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import HomeSaleInfo from '../HomeComponents/HomeSaleInfo';
import NewsLetter from '../HomeComponents/NewsLetter';
import Footer from './Footer';
import heroaa from '../../Images/heropixel.jpg';
import { UsersIcon } from '@heroicons/react/outline'
import TrustPage from '../HomeComponents/TrustPage'
import Navbar from '../../Pages/Navbar'
import Incentives from "./Incentives"
import { Link } from 'react-router-dom';
function Home() {
  return (
  <>
  <div>
    <Navbar/>
    <div
        className="h-[600px]"  
        style={{
          backgroundImage: `url(${heroaa})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
    }}>
        <div className='pt-[100px]  h-[600px]'>
        <div className=' ml-[100px] flex flex-row space-x-4 '>
            <h1 className='mt-[-7px] text-yellow-600 brightness-100'></h1>
            <h2 className='text-yellow-400 brightness-200 font-sans text-xl uppercase tracking-widest font-bold'>Welcome to Essentia</h2>
        </div>
        <div className='mt-[50px] ml-[100px] w-[590px] space-y-5'>
            <h1 className='text-white brightness-200 font-sans font-bold text-4xl tracking-'>Revitalize Your Routine, Redefine Your Essentials with Us!</h1>
        <p className='text-white brightness-100 font-thin'>Dive into the essence of quality with our curated collection, where each item is meticulously selected with your needs and preferences in mind. Whether you are in search of timeless classics or innovative solutions, Essentia is your reliable partner in crafting spaces that authentically embody your unique essence. Explore our handpicked treasures and elevate your surroundings with style and purpose.</p>
        </div>
        
        <div className='mt-[50px] ml-[100px] flex flex-row space-x-4  '>
        <Link to="/products"><button className=' flex flex-row font-serif bg-yellow-600 brightness-150 py-3.5 px-9 hover:bg-white hover:translate-x-2 hover:scale-105 duration-300 ... '>
            SHOP NOW 
        <BsArrowRightShort className='mt-1 ml-2  hover:translate-x-2 hover:scale-105 duration-300 ... '/> 
        </button></Link>
        </div>
      </div>
      </div>
      {/* --------------------------------------- Trust Page ----------------------------------------*/}
      <TrustPage/>
    <div className="relative bg-white">
    <div className="h-56 bg-indigo-600 sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
        alt="Support team"
      />
    </div>
    {/* --------------------------------------- Customer Needs ----------------------------------------*/}
    <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
        <div>
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
            <UsersIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Deliver what your customers want every time
        </h2>
        <p className="mt-6 text-lg text-gray-500">
        Delivering what our customers want is at the heart of our mission. We strive to understand their needs, exceed expectations, and consistently provide value. It's not just a commitment; it's our passion to ensure every interaction leaves our customers satisfied and delighted.
        </p>
        <div className="mt-8 overflow-hidden">
          <dl className="-mx-8 -mt-8 flex flex-wrap">
            <div className="flex flex-col px-8 pt-8">
              <dt className="order-2 text-base font-medium text-gray-500">Delivery</dt>
              <dd className="order-1 text-2xl font-extrabold text-yellow-500 sm:text-3xl">24/7</dd>
            </div>
            <div className="flex flex-col px-8 pt-8">
              <dt className="order-2 text-base font-medium text-gray-500">Customer Support</dt>
              <dd className="order-1 text-2xl font-extrabold text-yellow-500 sm:text-3xl">99.9%</dd>
            </div>
            <div className="flex flex-col px-8 pt-8">
              <dt className="order-2 text-base font-medium text-gray-500">Orders</dt>
              <dd className="order-1 text-2xl font-extrabold text-yellow-500 sm:text-3xl">100k+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <br></br>
  {/* --------------------------------------- Growing Rapidly ----------------------------------------*/}
  <div>
<section class="relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-20">
  <div class="absolute h-72 w-72 scale-125 -right-8 -bottom-10">
    <div class="absolute h-60 w-60 rounded-2xl border-4 border-yellow-600"></div>
    <div class="absolute h-60 w-60 translate-x-3 translate-y-3 rounded-2xl border-4 border-yellow-600"></div>
    <div class="absolute h-60 w-60 translate-x-6 translate-y-6 rounded-2xl border-4 border-yellow-600"></div>
  </div>
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="sm:text-center">
      <h2 class="text-3xl font-semibold leading-7 text-gray-900 sm:text-4xl xl:text-5xl">
        We are <br class="sm:hidden" />
        growing rapidly
      </h2>
      <hr class="mt-4 h-1.5 w-32 border-none bg-yellow-600 sm:mx-auto sm:mt-8" />
    </div>

    <div class="mx-auto mt-20 grid max-w-screen-lg grid-cols-1 gap-x-8 gap-y-12 text-center sm:text-left md:grid-cols-3">
      <div class="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-12 py-10 text-left shadow lg:px-12">
        <p class="relative text-5xl font-black text-yellow-600">1M</p>
        <p class="relative mt-5 text-gray-600">Discover why Essentia has processed over 1 million orders. Join Over 1 Million Satisfied Customers!</p>
      </div>

      <div class="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-12 py-10 text-left shadow lg:px-12">
        <p class="relative text-5xl font-black text-yellow-600">50%</p>
        <p class="relative mt-5 text-gray-600">Unlock Savings! Enjoy a Limited-Time Offer - Save 51% on all Products.</p>
      </div>

      <div class="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-12 py-10 text-left shadow lg:px-12">
        <p class="relative m-0 text-5xl font-black text-yellow-600">8529+</p>
        <p class="relative mt-5 text-gray-600">Trust the Choice of 8529+ Users! Join thousands of satisfied customers who have made Essentia their preferred destination.</p>
      </div>
    </div>
  </div>
</section>
</div>
  <Incentives/>
  {/* --------------------------------------- Newsletter ----------------------------------------*/}
<NewsLetter/>
  {/* --------------------------------------- Footer ----------------------------------------*/}
<Footer/>
  </div>
  </>
  );
}

export default Home;