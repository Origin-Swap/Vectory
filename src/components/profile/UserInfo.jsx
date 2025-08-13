import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineChat, MdGroupAdd } from "react-icons/md";
import UserProfileForm from './UserProfileForm';
import { useAccountSupra } from "../../context/account";

const UserInfo = ({ onProfileUpdate }) => {
  const { address, isConnected, connectWallet, disconnectWallet } = useAccountSupra();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    avatar: "/images/default-avatar.png",
    username: "",
    bio: "",
    email: ""
  });

  // Ambil data user dari backend saat address berubah
  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5004/api/user/${address}`);
        if (res.status === 404) {
          console.log("User not found, using default profile");
          setProfile({
            avatar: "/images/default-avatar.png",
            username: "",
            bio: "",
            email: ""
          });
          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [address]);


  return (
    <>
      <div className="relative -top-16 px-2 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
          <div className="relative w-28 h-28">
            <img
              src={profile.avatar || "/images/default-avatar.png"}
              alt="Profile"
              className="w-full bg-white h-full rounded-full border-4 border-gradient-to-tr from-blue-400 to-purple-500 shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              {profile.username || "Anonymous"}
            </h1>
            <p className="text-sm text-gray-500 font-mono mb-4">
              {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </p>
            <p className="text-sm text-gray-500 mb-2">{profile.bio}</p>
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
                <button
                  className="flex bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FaUserGear className="text-lg items-center mr-1"/> Edit
                </button>
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
            <button
              className="flex bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              <FaUserGear className="text-lg items-center mr-1"/> Edit
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-2  max-w-lg w-full relative">

            {/* Tombol X di pojok kanan atas */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>

            <UserProfileForm
              address={address}
              initialData={{ ...profile }}
              onSave={(data) => {
                setProfile(data);
                onProfileUpdate(data);
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

    </>
  );
};

export default UserInfo;
