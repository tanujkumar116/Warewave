import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight
} from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {cart}=useSelector((state)=>state.cart);
  const {user}=useSelector((state)=>state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const cartItemCount=cart?.products?.reduce((total,product)=>total+product.quantity,0);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="container flex mx-auto items-center justify-between py-1 px-2 h-20">
        <div>
          <Link to="/" className="text-2xl font-medium">
            WearWave
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/collections/all?category=&gender=Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Men
          </Link>
          <Link to="/collections/all?category=&gender=Women" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Women
          </Link>
          <Link to="/collections/all?category=Top+Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Top Wear
          </Link>
          <Link to="/collections/all?category=Bottom+Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Bottom Wear
          </Link>
        </div>

        {/* Icons and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {user && user.role=="admin" && <Link to='/admin' className='bolck bg-black rounded text-sm text-white p-1'>Admin</Link>}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button className="relative hover:text-black" onClick={toggleDrawer}>
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount>0 && <span className="absolute top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {cartItemCount}
            </span>}
          </button>
          <SearchBar />
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleDrawer} />

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className='space-y-4'>
            <Link
              to="/collections/all?category=&gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black mb-2"
            >
              Men
            </Link>
            <Link
              to="/collections/all?category=&gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black mb-2"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top+Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black mb-2"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom+Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black mb-2"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
