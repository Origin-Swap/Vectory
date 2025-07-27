import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';
import TopBar from './TopBar';
import { BsCart4 } from "react-icons/bs";
import { ImFeed } from "react-icons/im";
import { IoCreateOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RiUserSettingsLine } from "react-icons/ri";

const BottomMenu = () => {
  const { address } = useAccount();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const [profileData, setProfileData] = useState({
    avatar: '',
  });
  const defaultAvatar = '/images/avatar2.png';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/profile/${address}`);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    // Ensure address is available
    if (address) {
      fetchProfile();
    }
  }, [address]);

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
      {/* TopBar
      <div
        className={`lg:hidden fixed top-0 w-full text-black transition-transform duration-100 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <TopBar />
      </div>  */}

      <div
        className={`lg:hidden  fixed bottom-0 w-full bg-gray-100 dark:bg-[#334155] rounded-t-3xl text-black flex justify-around p-2 items-center border-t transition-transform duration-100 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
      {/* <Link
        to="/home"
        className={`flex flex-col items-center ${
          isActive('/home') ? 'border p-1 rounded-md border-[#14b8a6]' : ''
        }`}
      >
        <GrHomeRounded className="w-6 h-6 text-black" />
      </Link> */}
      <Link
        to="/"
        className={`flex flex-col items-center ${
          isActive('/') ? 'border p-1 rounded-md border-[#14b8a6]' : ''
        }`}
      >
        <BsCart4 className="w-6 h-6 text-black" />
      </Link>
         {/* <Link
          to="/create-items"
          className={`flex flex-col items-center ${
            isActive('/create-items') ? 'border p-1 rounded-md border-[#14b8a6]' : ''
          }`}
        >
          <IoCreateOutline className="w-6 h-6 dark:fill-white" />
        </Link> */}
        <Link
          to="/profile"
          className={`flex flex-col items-center ${
            isActive('/profile') ? 'border p-1 rounded-md border-[#14b8a6]' : ''
          }`}
        >
          <RxDashboard className="w-6 h-6 text-black" />
        </Link>
        {/* <Link
          to={`/profile/${address}`}
          className={`flex flex-col items-center ${
            isActive(`/profile/${address}`) ? 'border p-1 rounded-md border-[#14b8a6]' : ''
          }`}
        >}
          <img src={profileData.avatar || defaultAvatar} alt="Preview" className="w-7 h-7 dark:fill-white rounded-full border-2 border-slate-200" />
        </Link> */}
      </div>
    </>
  );
};

export default BottomMenu;
