import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { base } from 'viem/chains';
import { supra } from '../../context/chains';
import axios from 'axios';
import { API_URL } from '../../config/ApiUrl';
import { HiOutlineChatAlt2, HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoNotifications, IoCartOutline } from "react-icons/io5";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains: supportedChains, switchChain } = useSwitchChain();

  const [profileData, setProfileData] = useState({ avatar: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultAvatar = '/images/avatar-image.png';

  const chainOptions = [
    // { id: supra.id, name: 'SUPRA', icon: '/images/tokens/supra.webp' },
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
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-4 py-3">
        <div className="flex items-center flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo2.png" alt="Logo" className="h-8 dark:hidden" />
            <img src="/images/logo-white.png" alt="Logo" className="hidden h-8 dark:block" />
            <span className="text-xl font-bold text-black dark:text-white">Kraftera</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4">
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
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <HiOutlineChatAlt2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleNotif}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <IoNotifications className="w-5 h-5 dark:fill-current" />
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
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
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
                <AiOutlineMenuUnfold className="w-8 h-8" />
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
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    PointBoard
                  </Link>
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

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="mr-2 p-2 text-gray-700 dark:text-gray-300"
          >
            {isMobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo2.png" alt="Logo" className="h-8 dark:hidden" />
            <img src="/images/logo-white.png" alt="Logo" className="hidden h-8 dark:block" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-700 dark:text-gray-300"
          >
            <HiOutlineSearch className="w-5 h-5" />
          </button>

          {isConnected && (
            <button
              onClick={handleNotif}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              <IoNotifications className="w-5 h-5 dark:fill-current" />
            </button>
          )}

          {isConnected ? (
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!isProfileDropdownOpen);
                  setDropdownOpen(false);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={profileData.avatar || defaultAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          ) : (
            <ConnectButton
              accountStatus="avatar"
              chainStatus="none"
              showBalance={false}
            />
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3">
            {isConnected && (
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <HiOutlineChatAlt2 className="w-5 h-5 mr-3" />
                Chat
              </button>
            )}

            {isConnected && currentChain && (
              <div className="mt-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Current Network
                </div>
                <div className="flex items-center px-4 py-2">
                  <img
                    src={currentChain.icon}
                    alt={currentChain.name}
                    className="w-5 h-5 mr-3 rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{currentChain.name}</span>
                </div>
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Switch Network
                </div>
                {chainOptions.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => handleSwitchChain(chain)}
                    className={`flex items-center w-full px-4 py-2 text-left ${
                      chain.id === chainId
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-5 h-5 mr-3 rounded-full"
                    />
                    {chain.name}
                  </button>
                ))}
              </div>
            )}

            {isConnected && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  to="/stake"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Staking Pools
                </Link>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
