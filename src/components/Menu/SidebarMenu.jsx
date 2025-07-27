import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { base } from 'viem/chains';
import { BsCart4 } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import NotifIcon from '../../assets/notif';
import { HiOutlineChatAlt2 } from "react-icons/hi";
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const location = useLocation();
  const [profileData, setProfileData] = useState({ avatar: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [selectedChain] = useState({
    id: base.id,
    name: 'BASE',
    icon: '/images/chain/base.png',
  });

  // State untuk mengontrol visibilitas dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const chains = [
    { id: base.id, name: 'BASE', icon: '/images/chain/base.png' },
  ];

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

  const handleNotif = () => {
    navigate(`/notification`);
  };

  const handleChainChange = (chain) => {
    setDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Market', Icon: BsCart4 },
    // { path: '/create-items', label: 'Launch Product', Icon: IoCreateOutline },
    { path: '/profile', label: 'Profile', Icon: RxDashboard },
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
        <span className="text-xl font-bold text-black dark:text-white">Kraftera</span>
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
      <div className="flex items-center gap-x-2 relative font-sans text-sm"> {/* Tambahan font dan text size */}
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
      <div className="relative">
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
      </div>
      <ConnectButton
        accountStatus="avatar" // ini akan menampilkan hanya avatar di semua ukuran layar
        chainStatus="icon"
        showBalance={false}
      />
      </div>
    </nav>
  );
};

export default Navbar;
