import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { base } from 'viem/chains';
import { BsCart4 } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';

const Navbar = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const location = useLocation();
  const [profileData, setProfileData] = useState({ avatar: '', name: '' });
  const [loading, setLoading] = useState(true);

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

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
    if (address) fetchProfile();
  }, [address]);

  const defaultAvatar = '/images/avatar2.png';
  const defaultName = 'Unknow';

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Market', Icon: BsCart4 },
    { path: '/create-items', label: 'Launch Product', Icon: IoCreateOutline },
    { path: '/dashboard', label: 'Dashboard', Icon: RxDashboard },
  ];

  return (
    <nav className="w-full bg-gray-100 dark:bg-gray-900 border-b shadow px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/images/logo2.png"
          alt="Logo"
          className="h-8 dark:hidden"
        />
        <img
          src="/images/logo-white.png"
          alt="Logo"
          className="h-8 hidden dark:block"
        />
        <span className="text-xl font-bold text-black dark:text-white">Vectory</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {menuItems.map(({ path, label, Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition ${
              isActive(path)
                ? 'bg-blue-500 text-white'
                : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>

      {/* Wallet Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleConnectWallet}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-1 px-3 rounded-full text-sm"
        >
          {isConnected ? (
            loading ? (
              'Loading...'
            ) : (
              <div className="flex items-center gap-2">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar.trim() || defaultAvatar}
                    alt={profileData.name || defaultName}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 bg-gray-400 rounded-full" />
                )}
                <span className="max-w-[80px] truncate">
                  {profileData.name?.slice(0, 10) || `${address.slice(0, 4)}...${address.slice(-3)}`}
                </span>
              </div>
            )
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
