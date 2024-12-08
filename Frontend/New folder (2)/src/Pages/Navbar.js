import { Fragment, useState} from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline'
import image from "../Images/black.png";
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../Features/User'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const navigation = {
  page: [
    { name: 'Home', href: '/' },
  ],
  category: [
    {
      name: 'Category',
      featured: [
        { name: 'Kitchen and Dining', id: 1 },
        { name: 'Home Decor', id: 2 },
        { name: 'Bedding and Linens', id: 3 },
        { name: 'Home Appliances', id: 4 },
      ],
      collection: [
        { name: 'Cleaning Supplies', id: 5 },
        { name: 'Furniture', id: '6' },
      ],
      categories: [
        
        { name: 'Gardening and Outdoor Living', id:'7' },
        { name: 'Pet Supplies', id:'8' },
      ],
      brands: [
        { name: 'Storage Solutions', id: '9' },
      ],
    },
  ],
  pages: [
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Contact Us', href: '/contactus' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const user = useSelector((state)=> state.user.value);
  const uid = localStorage.getItem('uid');
  const userId = uid;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleAuth = () => {
    navigate('/');
    Dispatch(logout());
    window.location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
  }

  const [open, setOpen] = useState(false);
  const [popen, setpOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const toggleProfile = () => {
    setpOpen(!popen);
    
  };
  const setprofile = () => {
    setpOpen(false);
  }  
  return (
    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="/" className="-m-2 p-2 block font-medium text-gray-900">
                    Home
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/products" className="-m-2 p-2 block font-medium text-gray-900">
                    Products
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/category" className="-m-2 p-2 block font-medium text-gray-900">
                    Category
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/aboutus" className="-m-2 p-2 block font-medium text-gray-900">
                    About Us
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/ContactUs" className="-m-2 p-2 block font-medium text-gray-900">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              <form className="hidden lg:block lg:flex-1">
              </form>
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none overflow-hidden">
      <span className="animate-marquee">
        Get free delivery on orders over ₹1000
      </span>
    </p>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              </div>
            </div>
          </div>

          <div className="bg-white ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="border-b border-gray-200 ">
                <div className="h-16 flex items-center justify-between">
                  <div className="hidden lg:flex lg:items-center float-left mr-12">
                    <a href="/">
                      <img
                        className="h-16 w-auto"
                        src={image}
                        alt="Essentia"
                      />
                    </a>
                  </div>
                  <div className="hidden h-full lg:flex text-decoration-line: none focus:outline-none">
                    <Popover.Group className="ml-8">
                      <div className="h-full flex justify-center space-x-8 focus:outline-none">
                      {navigation.page.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400 focus:outline-none"
                        >
                          {page.name}
                        </a>
                      ))}
                        {navigation.category.map((category, categoryIdx) => (
                          <Popover key={category.name} className="flex-absolute top-0 inset-x-0 text-gray-500 sm:text-sm z-50 mt-[16.5%] focus:outline-none">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-transparent focus:outline-none text-decoration-none'
                                        : 'border-transparent focus:outline-none text-gray-800 hover:text-gray-400',
                                      'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute top-full inset-x-0 text-gray-500 sm:text-sm">
                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                    <div className="relative bg-white">
                                      <div className="max-w-7xl mx-auto px-8">
                                        <div className="grid grid-cols-2 items-start gap-y-10 gap-x-8 pt-10 pb-12">
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p
                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-gray-900"
                                              >
                                                Featured
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                              {category.featured && category.featured.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={`/api/products/byCategory/${item.id}`} className="hover:text-gray-800">
                                                    {item.name}
                                                    </a>
                                                </li>
                                              ))}
                                              </ul>
                                            </div>
                                            <div>
                                              <p id="desktop-categories-heading" className="font-medium text-gray-900">
                                                Categories
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.categories && category.categories.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={`/api/products/byCategory/${item.id}`} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p id="desktop-collection-heading" className="font-medium text-gray-900">
                                                Collection
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-collection-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.collection && category.collection.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={`/api/products/byCategory/${item.id}`} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>

                                            <div>
                                              <p id="desktop-brand-heading" className="font-medium text-gray-900">
                                                Brands
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-brand-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.brands && category.brands.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={`/api/products/byCategory/${item.id}`} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}
                      </div>
                    </Popover.Group>
                    </div>
               <div className="hidden h-full lg:flex">
                    <Popover.Group className="ml-8">
                      <div className="h-full flex justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-400"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>
                  <div className="flex-1 flex items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <a href="/" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    <img
                      src={image}
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>
                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ">
                          <div className="flex flex-row space-x-10">
                            <button
                            onClick={toggleProfile}
                              type="button"
                              className="flex-shrink-0 text-gray-400 hover:text-gray-500 font-blackh-6 w-6 relative flex text-sm "
                              id="user-menu-button"
                              aria-expanded="false"
                              aria-haspopup="true"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
                            </button>
                  </div>
                        {user.name ? (
                          <div
                            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                              popen ? "block" : "hidden"
                            }`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabIndex="-20"
                          >
                            <h1
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              tabIndex="-1"
                              id="user-menu-item-0"
                            >
                              Hello <span className="font-bold">{user.name}</span>
                            </h1>
                            <Link
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                            id="user-menu-item-2"
                            onClick={handleAuth}
                            to="/"
                            >
                              Sign out
                            </Link>
                          </div>
                        ) : (
                          <div
                            className={`absolute right-0 z-10 mt-2 w-[250px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                              popen ? "block" : "hidden"
                            }`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabIndex="-20"
                          >
                            <h1
                              className="block px-4 py-2 text-sm text-black font-bold"
                              role="menuitem"
                              tabIndex="-1"
                              id="user-menu-item-0"
                            >
                              Welcome
                            </h1>
                            <p
                              className="text-s block px-4 py-1 text-sm text-black font-light -tracking-[-1px]]"
                              role="definition"
                              tabIndex="-1"
                            >
                              To access Account and Manage Orders
                            </p>
                            <Link
                              to="/login"
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              tabIndex="-1"
                              id="user-menu-item-0"
                            >
                              <button className='bg-transparent text-black font-semibold py-2 px-4 border-[3px] hover:bg-gray-100 border-gray-200 hover:transition-border-color hover:transition-timing-function:ease-in-out hover:transition-duration:200ms hover:border-black'>
                                Login/SignUp
                              </button>
                            </Link>
                          </div>
                        )}                     
                      </div>
                      </div>
                      </div>
                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />
                      <div className="flow-root">
                        <a href="/cart" className="group -m-2 p-2 flex items-center">
                          <ShoppingCartIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                      <div className="flow-root">
                        <a href="/wishlist" className="group -m-2 ml-6 flex items-center">
                        <svg
                          viewBox="0 0 1024 1024"
                          fill="currentColor"
                          height="1.5em"
                          width="1.5em"
                          className='text-gray-400 group-hover:text-gray-500'>
                          <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                        </svg>                   
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}