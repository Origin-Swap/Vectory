import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { base } from 'viem/chains';
import { supra } from '../../context/chains';
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
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain, isPending } = useSwitchChain();

  const location = useLocation();
  const [profileData, setProfileData] = useState({ avatar: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isChainDropdownOpen, setChainDropdownOpen] = useState(false);


  const chainOptions = [
    { id: supra.id, name: 'SUPRA', icon: '/images/tokens/supra.webp' },
    { id: base.id, name: 'BASE', icon: '/images/chain/base.png' },
  ];

  const currentChain = chainOptions.find(chain => chain.id === chainId);

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

  const defaultAvatar = '/images/avatar/Av11.png';

  const handleNotif = () => {
    navigate(`/notification`);
  };

  const handleSwitchChain = (targetChain) => {
    if (switchChain) {
      switchChain({ chainId: targetChain.id });
      setDropdownOpen(false);
    } else {
      alert('Switch chain not supported.');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-900 border-b shadow px-4 py-3 flex items-center justify-between gap-4">

      <Link to="/" className="flex items-center gap-2">
        <img src="/images/logo2.png" alt="Logo" className="h-8 dark:hidden" />
        <img src="/images/logo-white.png" alt="Logo" className="h-8 hidden dark:block" />
        <span className="text-xl font-bold text-black dark:text-white">Kraftera</span>
      </Link>

      <div className="flex-grow max-w-md mx-auto">
       <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
       />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-x-2 relative font-sans text-sm">
        {isConnected && (
          <>
            <button className="flex bg-gray-100 dark:bg-transparent p-1 rounded-full" aria-label="View Chat">
              <HiOutlineChatAlt2 className="h-6 w-6 text-black" loading="lazy" />
            </button>

            <button className="flex bg-gray-100 dark:bg-transparent p-1 rounded-full" onClick={handleNotif} aria-label="View Notifications">
              <NotifIcon className="h-6 w-6 dark:fill-white" loading="lazy" />
            </button>
          </>
        )}

        {/* Chain Dropdown */}
        {isConnected && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex bg-gray-100 dark:bg-transparent p-2 rounded-full"
              aria-label="Select Blockchain"
            >
              {currentChain && <img src={currentChain.icon} alt={currentChain.name} className="h-6 w-6" loading="lazy" />}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg w-32 z-10">
                {chainOptions.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => handleSwitchChain(chain)}
                    className={`flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      chain.id === chainId ? 'font-bold text-blue-600' : ''
                    }`}
                  >
                    <img src={chain.icon} alt={chain.name} className="h-5 w-5" loading="lazy" />
                    {chain.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        {isConnected ? (
          <div className="relative flex items-center gap-2">
            <button
            onClick={() => {
                setProfileDropdownOpen(!isProfileDropdownOpen);
                setChainDropdownOpen(false); // close chain dropdown if open
              }}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <img src={profileData.avatar || defaultAvatar} alt="avatar" className="w-6 h-6 rounded-full" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
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
          <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
