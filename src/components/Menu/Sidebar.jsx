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
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaGithub, FaRegHandshake } from "react-icons/fa";

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
      {/* Menu Utama */}
      <nav className="flex-1 flex flex-col gap-1">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <IoCartOutline className="w-5 h-5" /> Market
        </button>

        <button
          onClick={() => navigate("/socialfi")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/socialfi") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <MdOutlineRssFeed className="w-5 h-5" /> Feeds
        </button>

        <button
          onClick={() => navigate("/seller-board")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/seller-board") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <MdOutlineSell className="w-5 h-5" /> Seller
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/dashboard") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <MdOutlineLeaderboard className="w-5 h-5" /> Point
        </button>

        <button
          onClick={() => window.open("https://iq.wiki/wiki/kraftera", "_blank")}
          className="flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <img src="/braindao-mark-mono.png" className="w-5 h-5" /> IQ
        </button>

        <button
          onClick={() => navigate("/stake")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/stake") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <RiHandCoinLine className="w-5 h-5" /> Earn
        </button>

        <button
          onClick={() => navigate("/point-exchange")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/point-exchange") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <RiTokenSwapFill className="w-5 h-5" /> Convert
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`flex items-center font-bold gap-3 px-3 py-1 rounded-lg dark:text-white transition-colors ${
            isActive("/profile") ? "menu-active bg-black/10 dark:bg-white/10" : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <PiUserCircleGearLight className="w-5 h-5" /> Profile
        </button>
      </nav>

      {/* Separator */}
      <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

      {/* Menu Footer */}
      <nav className="flex flex-col gap-1">
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
      </nav>

      {/* Dark/Light Mode Toggle */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-full"
        >
          {document.documentElement.classList.contains("dark") ? (
            <>
              <MdLightMode className="w-5 h-5 text-yellow-500" />
              <span className="font-medium dark:text-white">Light Mode</span>
            </>
          ) : (
            <>
              <MdDarkMode className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="font-medium dark:text-white">Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidebarMenu;
