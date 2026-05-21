import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';
import TopBar from './evmTopBar';
import { BsShop } from "react-icons/bs";
import { ImFeed } from "react-icons/im";
import { IoCreateOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import { MdOutlineRssFeed, MdOutlineSell } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";

const BottomMenu = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down and past 50px
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Fungsi untuk menentukan menu aktif
  const isActive = (path) => location.pathname === path;

  return (
    <>

      <div
        className={`lg:hidden fixed top-0 w-full text-black transition-transform duration-100 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <TopBar />
      </div>

      <div
        className={`lg:hidden  fixed bottom-0 w-full bg-gray-50 dark:bg-[#334155] rounded-t-xl text-black flex justify-around py-2 items-center border-t-2 transition-transform duration-100 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
      <Link
        to="/"
        className={`flex flex-col items-center ${
          isActive('/') ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
        }`}
      >
        <BsShop className="w-6 h-6 text-gray-800 " />
        <span className="text-sm text-gray-800 pt-1"> Home </span>
      </Link>
         <Link
          to="/socialfi"
          className={`flex flex-col items-center ${
            isActive('/socialfi') ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
          }`}
        >
          <MdOutlineRssFeed className="w-6 h-6 text-gray-800 " />
          <span className="text-sm text-gray-800 pt-1"> Feeds </span>
        </Link>
        <Link
          to="/seller-board"
          className={`flex flex-col items-center ${
            isActive('/seller-board') ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
          }`}
        >
          <MdOutlineSell className="w-6 h-6 text-gray-800 " />
          <span className="text-sm text-gray-800 pt-1"> Seller </span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center ${
            isActive('/dashboard') ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
          }`}
        >
          <VscDashboard className="w-6 h-6 text-gray-800 " />
          <span className="text-sm text-gray-800 pt-1"> Point </span>
        </Link>
        <Link
          to="/stake"
          className="flex flex-col items-center border p-1 rounded-md border-2 border-yellow-300"
        >
          <img src="/braindao-mark-mono.png" className="w-6 h-6 text-gray-800 " />
          <span className="text-sm text-gray-800 pt-1"> IQ AI </span>
        </Link>
        <Link
          to="/stake"
          className={`flex flex-col items-center ${
            isActive('/stake') ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
          }`}
        >
          <RiCoinsLine className="w-6 h-6 text-gray-800 " />
          <span className="text-sm text-gray-800 pt-1"> Earn </span>
        </Link>
        {/* <Link
          to={`/profile/${address}`}
          className={`flex flex-col items-center ${
            isActive(`/profile/${address}`) ? 'border p-1 rounded-md border-2 border-yellow-300' : ''
          }`}
        >
          <img src={profileData.avatar || defaultAvatar} alt="Preview" className="w-7 h-7 dark:fill-white rounded-full border-2 border-slate-200" />
        </Link> */}
      </div>
    </>
  );
};

export default BottomMenu;
