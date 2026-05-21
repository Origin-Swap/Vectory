import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { base } from 'viem/chains';
import { supra } from '../../context/chains';
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';
import { HiOutlineChatAlt2, HiOutlineSearch } from "react-icons/hi";
import { IoNotifications, IoCartOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import DarkModeToggle from './../useDarkMode';
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaGithub, FaRegHandshake } from "react-icons/fa";
import { PiUserCircleGearLight } from "react-icons/pi";

const TopBar = () => {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains: supportedChains, switchChain } = useSwitchChain();

  const [profileData, setProfileData] = useState({ avatar: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultAvatar = '/images/avatar-image.png';

  // Chain options with filtering for supported chains
  const chainOptions = [
    { id: supra.id, name: 'SUPRA', icon: '/images/tokens/supra.webp' },
    { id: base.id, name: 'BASE', icon: '/images/chain/base.png' },
  ].filter(chain => supportedChains.some(supported => supported.id === chain.id));

  const currentChain = chainOptions.find(chain => chain.id === chainId);

  const handleSwitchChain = async (targetChain) => {
    try {
      await switchChain({ chainId: targetChain.id });
      setDropdownOpen(false);
    } catch (err) {
      console.error('Failed to switch chain:', err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return;

      try {
        const { data } = await axios.get(`${API_URL}/api/profile/${address}`);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  const handleNotif = () => navigate('/notification');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search (mobile) */}
          <div className="flex items-center flex-1">
            <Link to="/" className="flex items-center mr-2">
              <img
                src="/images/logo2.png"
                alt="Logo"
                className="h-8 dark:hidden"
              />
              <img
                src="/images/logo-white.png"
                alt="Logo"
                className="hidden h-8 dark:block"
              />
            </Link>

            {/* Mobile search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* <DarkModeToggle className="p-2" /> */}

            {isConnected && (
              <>
                <button
                  onClick={() => navigate('/chat')}
                  className="p-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <IoCartOutline className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="p-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <HiOutlineChatAlt2 className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNotif}
                  className="p-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <IoNotifications className="w-6 h-6 dark:fill-current" />
                </button>
              </>
            )}

            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, openChainModal }) => (
                <button
                  onClick={isConnected ? openChainModal : openConnectModal}
                  className={`connect-custom-btn ${isConnected ? 'connected' : ''}`}
                >
                  {isConnected ? (
                    chain.iconUrl ? (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name || 'Chain icon'}
                        className="w-6 h-6"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-chain-icon.png'; // Fallback icon
                        }}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    )
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              )}
            </ConnectButton.Custom>

            {/* Profile dropdown */}
            {isConnected && (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!isProfileDropdownOpen);
                    setDropdownOpen(false);
                  }}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FiMenu className="w-6 h-6" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {profileData.name || 'My Account'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                    <PiUserCircleGearLight className="w-5 h-5" />  My Profile
                    </Link>
                    <button
                      onClick={() => window.open("https://drive.google.com/file/d/1XeerOx7NQUVUbYjdb_ffgItS5llo_6yq/view?usp=sharing", "_blank")}
                      className="flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <BsFileEarmarkPdf className="w-5 h-5" /> Whitepaper
                    </button>

                    <button
                      onClick={() => window.open("https://github.com/kraftera-market", "_blank")}
                      className="flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <FaGithub className="w-5 h-5" /> Github
                    </button>

                    {/* <button
                      onClick={() => window.open("https://braindao.eco", "_blank")}
                      className="flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <FaRegHandshake className="w-5 h-5" /> Ecosystem
                    </button> */}
                    
                    <button
                      onClick={() => {
                        disconnect();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden py-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
