import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineChatAlt2, HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { IoNotifications, IoCartOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { API_URL } from "../../config/ApiUrl";
import { useAccountSupra } from "../../context/account";
import { MdOutlineRssFeed } from "react-icons/md";

const TopBar = () => {
  const navigate = useNavigate();
  const { address, isConnected, connectWallet, disconnectWallet } = useAccountSupra();

  const [profileData, setProfileData] = useState({ avatar: "", name: "" });
  const [loading, setLoading] = useState(true);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const defaultAvatar = "/images/avatar-image.png";

  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return;
      try {
        const { data } = await axios.get(`${API_URL}/api/user/${address}`);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [address]);

  useEffect(() => {
  const registerAndReferral = async () => {
    if (isConnected && address) {
      try {
        await axios.post(`${API_URL}/api/user/register`, { address });

        // cek apakah ada referral code di url
        const ref = new URLSearchParams(window.location.search).get("ref");
        if (ref && ref.toLowerCase() !== address.toLowerCase()) {
          await axios.post(`${API_URL}/api/user/referral`, {
            referrerAddress: ref,
            newUserAddress: address,
          });
          console.log("🎉 Referral saved:", ref, "→", address);
        }
      } catch (err) {
        console.error("Register/Referral error:", err);
      }
    }
  };
  registerAndReferral();
}, [isConnected, address]);


  const handleNotif = () => navigate("/notification");
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
                src="/icons/icon-512x512.png"
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
                  onClick={() => navigate('/my-cart')}
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

            {!isConnected && (
              <button
                onClick={connectWallet}
                className="px-3 py-1 rounded-lg bg-yellow-200 text-gray-800"
              >
                Connect
              </button>
            )}


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
                        {profileData.username || 'My Account'}
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
                    {/* <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      PointBoard
                    </Link>
                    <Link
                      to="/stake"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Staking Pools
                    </Link> */}
                    <button
                      onClick={() => {
                        disconnectWallet(); // ✅ ganti dari disconnect()
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
