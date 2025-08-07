import React from 'react';
import { useAccount } from 'wagmi';
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineChat } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";

const UserInfo = ({ profile }) => {
  const { isConnected, address } = useAccount();

  return (
    <div className="relative -top-16 px-2 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
        <div className="relative w-28 h-28">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-gradient-to-tr from-blue-400 to-purple-500 shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">{profile.username}</h1>
          <p className="text-sm text-gray-500 font-mono mb-4">
            {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Digital creator & blockchain enthusiast.
          </p>
          <div className="flex gap-3 mt-2 justify-center md:justify-start">
            <button className="rounded-full px-4 py-1 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Follower
            </button>
            <button className="rounded-full px-4 py-1 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Following
            </button>
          </div>
          <div className="flex md:hidden flex-wrap gap-3 mt-4 justify-center">
          <button className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            <MdOutlineChat className="text-lg items-center mr-1"/>Chat
          </button>
            <button className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
              <MdGroupAdd className="text-lg items-center mr-1"/>Follow
            </button>
            {isConnected && (
              <>
                <button className=" flex bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition">
                  <FaUserGear className="text-lg items-center mr-1"/> Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isConnected && address && (
        <div className="hidden md:flex gap-3 mt-2">
        <button className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
          <MdOutlineChat className="text-lg items-center mr-1"/>Chat
        </button>
          <button className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            <MdGroupAdd className="text-lg items-center mr-1"/>Follow
          </button>
          <button className="flex bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition text-sm">
            <FaUserGear className="text-lg items-center mr-1"/> Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
