import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineChatAlt2, HiOutlineSearch, HiMenu, HiX } from "react-icons/hi";
import { IoNotifications, IoCartOutline } from "react-icons/io5";
import { MdOutlineRssFeed } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { API_URL } from "../../config/ApiUrl";
import { useAccountSupra } from "../../context/account";

const Navbar = () => {
  const navigate = useNavigate();
  const { address, isConnected, connectWallet, disconnectWallet } = useAccountSupra();

  const [profileData, setProfileData] = useState({ avatar: "", name: "" });
  const [loading, setLoading] = useState(true);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleNotif = () => navigate("/notification");
  const handleFeed = () => navigate("/socialfi");
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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/icons/icon-512x512.png" alt="Logo" className="h-8 dark:hidden" />
          <img src="/images/logo-white.png" alt="Logo" className="hidden h-8 dark:block" />
          <span className="text-xl font-bold text-black dark:text-white">Kraftera</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <HiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-4">
        {/* <button onClick={() => navigate("/socialfi")} className="p-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <MdOutlineRssFeed className="w-6 h-6" />
        </button> */}
        {isConnected && (
            <>
            <button
              onClick={() => navigate('/my-cart')}
              className="p-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <IoCartOutline className="w-6 h-6" />
            </button>
              {/* <button onClick={() => navigate("/chat")} className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <HiOutlineChatAlt2 className="w-5 h-5" />
              </button>
              <button onClick={handleNotif} className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <IoNotifications className="w-5 h-5 dark:fill-current" />
              </button> */}
            </>
            )}

          {/* Connect / Address Button */}
          {!isConnected && (
            <button
              onClick={connectWallet}
              className="px-3 py-1 rounded-lg  bg-yellow-200 text-gray-800"
            >
              Connect
            </button>
          )}

          {/* Profile dropdown */}
          {isConnected && (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <AiOutlineMenuUnfold className="w-6 h-6" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {profileData.username || "My Account"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  {/* <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">My Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">PointBoard</Link>
                  <Link to="/stake" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Staking Pool</Link> */}
                  <button
                    onClick={disconnectWallet}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        {/* Menu */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="mr-2 p-2 text-gray-700 dark:text-gray-300">
          {isMobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo2.png" alt="Logo" className="h-8 dark:hidden" />
          <img src="/images/logo-white.png" alt="Logo" className="hidden h-8 dark:block" />
        </Link>

        {/* Notif + Connect */}
        <div className="flex items-center gap-2">
          {isConnected && (
            <button onClick={handleNotif} className="p-2 text-gray-700 dark:text-gray-300">
              <IoNotifications className="w-5 h-5 dark:fill-current" />
            </button>
          )}
          {!isConnected && (
            <button
              onClick={connectWallet}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white"
            >
              Connect
            </button>
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3">
            {isConnected && (
              <>
                <Link to="/profile" className="block px-4 py-2 mt-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">My Profile</Link>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Dashboard</Link>
                <Link to="/stake" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">Staking Pools</Link>
                <button
                  onClick={disconnectWallet}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
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
