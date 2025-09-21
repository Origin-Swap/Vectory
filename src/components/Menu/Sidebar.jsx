// src/components/Menu/SidebarMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRssFeed,
  MdDarkMode,
  MdLightMode,
  MdNotificationsNone,
  MdOutlineLeaderboard,
  MdOutlineSell,
} from "react-icons/md";
import { IoCartOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiTokenSwapFill, RiHandCoinLine } from "react-icons/ri";
import { PiUserCircleGearLight } from "react-icons/pi";

const SidebarMenu = () => {
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <aside className="hidden mt-16 lg:flex flex-col w-64 bg-gray-50 dark:bg-gray-950 border-r border-gray-700 h-screen px-4 py-4 fixed">
      {/* Menu */}
      <nav className="flex-1 flex flex-col">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <IoCartOutline className="w-5 h-5" /> Market
        </button>

        <button
          onClick={() => navigate("/socialfi")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/socialfi") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <MdOutlineRssFeed className="w-5 h-5" /> Feeds
        </button>

        <button
          onClick={() => navigate("/seller-board")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/seller-board") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <MdOutlineSell className="w-5 h-5" /> Seller
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/dashboard") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <MdOutlineLeaderboard className="w-5 h-5" /> Point
        </button>

        <button
          onClick={() => navigate("/stake")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/stake") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <RiHandCoinLine className="w-5 h-5" /> Earn
        </button>

        <button
          onClick={() => navigate("/point-exchange")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/point-exchange") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <RiTokenSwapFill className="w-5 h-5" /> Convert
        </button>

        <button
          onClick={() => navigate("/notif")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/notif") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <MdNotificationsNone className="w-5 h-5" /> Notification
        </button>

        <button
          onClick={() => navigate("/chat")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/chat") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <IoChatbubbleEllipsesOutline className="w-5 h-5" /> Chat
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`flex items-center font-bold gap-3 px-3 py-2 rounded-lg dark:text-white ${
            isActive("/profile") ? "menu-active dark:bg-black" : "dark:bg-black"
          }`}
        >
          <PiUserCircleGearLight className="w-5 h-5" /> Profile
        </button>
      </nav>

      {/* Dark/Light Mode Toggle */}
      <div className="">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {document.documentElement.classList.contains("dark") ? (
            <MdLightMode className="w-6 h-6 text-yellow-500" />
          ) : (
            <MdDarkMode className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
