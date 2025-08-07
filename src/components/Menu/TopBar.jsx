import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { base } from 'viem/chains';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/ApiUrl';
import DefaultAvatar from './avatar2.png';
import MessageIcon from '../../assets/message';
import WalletIcon from '../../assets/wallet';
import DisconnectIcon from '../../assets/disconnect';
import { HiOutlineChatAlt2 } from "react-icons/hi";
import DarkModeToggle from './../useDarkMode';
import NotifIcon from '../../assets/notif';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';


const TopBar = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
  });
  const [loading, setLoading] = useState(true);

  const [selectedChain] = useState({
    id: base.id,
    name: 'BASE',
    icon: '/images/chain/base.png',
  });

  // State untuk mengontrol visibilitas dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const defaultAvatar = '/images/avatar/Av11.png';

  // Daftar chain yang tersedia
  const chains = [
    { id: base.id, name: 'BASE', icon: '/images/chain/base.png' },
  ];

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

    if (address) {
      fetchProfile();
    }
  }, [address]);

  const handleConnectWallet = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  };


  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleChainChange = (chain) => {
    setDropdownOpen(false);
  };

  const handleNotif = () => {
    navigate(`/notification`);
  };

  const defaultName = 'Unknown';

  return (
    <div className="fixed top-0 left-0 w-full z-50 py-2 bg-[#f5f5f5] dark:bg-[#020617] text-white flex items-center justify-between px-2 py-1 lg:p-2 mb-2">
      {/* Logo di kiri */}
      <div className="flex items-center ml-1">
      <p className="flex items-center text-xl text-black dark:text-white font-semibold">
      <img
        src="/images/logo2.png"
        alt="Project Logo"
        className="h-10 mr-1 dark:hidden"
      />
      <img
        src="/images/logo-white.png"
        alt="Project Logo"
        className="hidden h-10 mr-1 dark:block"
      />
      </p>
      <div className="flex-grow max-w-md mx-auto mx-2">
       <input
        type="text"
        placeholder="Search..."
        className="text-black w-full p-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
       />
      </div>
      </div>

      {/* Tombol Connect Wallet dan Dropdown Chain di kanan */}
      <div className="flex items-center">
        <div className="flex relative ">
        {isConnected && (
          <>
            <button
              className="flex bg-gray-100 dark:bg-transparent p-1 rounded-full"
              aria-label="View Chat"
            >
              <HiOutlineChatAlt2 className="h-6 w-6 text-black" loading="lazy" />
            </button>

            <button
              className="flex bg-gray-100 dark:bg-transparent p-1 rounded-full"
              onClick={handleNotif}
              aria-label="View Notifications"
            >
              <NotifIcon className="h-6 w-6 dark:fill-white" loading="lazy" />
            </button>
          </>
        )}
        </div>
        {/* <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex bg-gray-100 dark:bg-transparent p-2 rounded-full "
            aria-label="Select Blockchain"
          >
            <img src={selectedChain.icon} alt={selectedChain.name} className="h-6 w-6" loading="lazy" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-blue-100 text-black dark:text-white rounded-md shadow-lg w-32 z-10">
              {chains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => handleChainChange(chain)}
                  className="flex items-center hover:bg-gray-100 py-2 w-full"
                  aria-label={`Switch to ${chain.name}`}
                >
                  <img src={chain.icon} alt={chain.name} className="h-5 w-5 mr-2" loading="lazy" />
                  {chain.name}
                </button>
              ))}
            </div>
          )}
        </div> */}

        {isConnected ? (
          <div className="relative ml-1">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center rounded-full bg-gray-300 p-1"
            >
              <img
                src={profileData.avatar || defaultAvatar}
                alt="avatar"
                className="w-5 h-5 rounded-full"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  My Point
                </Link>
                <button
                  onClick={() => {
                    disconnect();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <ConnectButton
            accountStatus="avatar"
            chainStatus="icon"
            showBalance={false}
          />
        )}
        </div>
    </div>
  );
};

export default TopBar;
