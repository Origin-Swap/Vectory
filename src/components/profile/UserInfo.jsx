import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config/ApiUrl';
import { useParams } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineChat, MdGroupAdd } from "react-icons/md";
import UserProfileForm from './UserProfileForm';
import { LuBadgeCheck } from "react-icons/lu";
import { useAccount } from "wagmi";

const UserInfo = ({ onProfileUpdate }) => {
  const navigate = useNavigate();
  const [openChat, setOpenChat] = useState(false);
  const { address, isConnected } = useAccount();
  const { address: paramAddress } = useParams(); // param di URL

  // target address (profil siapa yang dibuka)
  const targetAddress = paramAddress || address;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    avatar: "/images/avatar-image.png",
    username: "",
    bio: "",
    email: ""
  });

  const [isFollowing, setIsFollowing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Register user jika belum terdaftar
  useEffect(() => {
    const registerUserIfNeeded = async () => {
      if (!isConnected || !address) return;

      try {
        console.log("Checking if user exists:", address);

        const checkRes = await fetch(`${API_URL}/api/user/${address}`);

        if (checkRes.status === 404) {
          console.log("User not found, registering...");
          const registerRes = await fetch(`${API_URL}/api/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: address.toLowerCase() })
          });

          if (registerRes.ok) {
            console.log("User registered successfully");
            const profileRes = await fetch(`${API_URL}/api/user/${address}`);
            const profileData = await profileRes.json();
            setProfile(profileData.data);
            setAvatarError(false); // Reset error state
          }
        } else if (checkRes.ok) {
          console.log("User already exists");
        }
      } catch (err) {
        console.error("Error checking/registering user:", err);
      }
    };

    registerUserIfNeeded();
  }, [address, isConnected]);

  // Ambil data user saat address berubah
  useEffect(() => {
    if (!targetAddress) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/${targetAddress}`);
        if (res.status === 404) {
          console.log("User not found, using default profile");
          setProfile({
            avatar: "/images/avatar-image.png",
            username: "",
            bio: "",
            email: ""
          });
          setAvatarError(false);
          return;
        }
        const data = await res.json();
        setProfile(data.data);
        setAvatarError(false); // Reset error state on new data
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile({
          avatar: "/images/avatar-image.png",
          username: "",
          bio: "",
          email: ""
        });
        setAvatarError(false);
      }
    };

    fetchProfile();
  }, [targetAddress]);

  // Cek apakah connected user sudah follow paramAddress
  useEffect(() => {
    const checkFollow = async () => {
      if (!address || !paramAddress) return;
      try {
        const res = await fetch(
          `${API_URL}/api/user/${paramAddress}/followers`
        );
        const data = await res.json();

        const alreadyFollowing = data.data.some(
          (u) => u.address.toLowerCase() === address.toLowerCase()
        );
        setIsFollowing(alreadyFollowing);
      } catch (err) {
        console.error("Error checking follow status:", err);
      }
    };
    checkFollow();
  }, [address, paramAddress]);

  // Handler follow/unfollow
  const handleFollowToggle = async () => {
    if (!address || !paramAddress) return;

    try {
      if (isFollowing) {
        await fetch(`${API_URL}/api/user/${paramAddress}/unfollow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerAddress: address }),
        });
        setIsFollowing(false);
      } else {
        await fetch(`${API_URL}/api/user/${paramAddress}/follow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerAddress: address }),
        });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Error follow/unfollow:", err);
    }
  };

  // Handler untuk error image
  const handleImageError = () => {
    setAvatarError(true);
  };

  // Menentukan sumber gambar yang akan ditampilkan
  const getAvatarSrc = () => {
    if (avatarError || !profile.avatar) {
      return "/images/avatar-image.png";
    }
    return profile.avatar;
  };

  return (
    <>
      <div className="relative -top-16 px-2 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
          <div className="relative w-28 h-28">
            <img
              src={getAvatarSrc()}
              alt="Profile"
              className="w-full bg-white h-full rounded-full border-4 border-gradient-to-tr from-blue-400 to-purple-500 shadow-lg"
              onError={handleImageError}
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white flex justify-center md:justify-start items-center gap-2 text-center md:text-left">
              {profile.username || "Anonymous"}

              {profile.level === "Silver" && (
                <LuBadgeCheck className="w-8 h-8 text-white fill-blue-500" />
              )}
              {profile.level === "Gold" && (
                <LuBadgeCheck className="w-8 h-8 text-white fill-yellow-500" />
              )}
            </h1>

            <p className="text-sm text-gray-500 font-mono mb-4">
              {isConnected ? `${targetAddress.slice(0, 6)}...${targetAddress.slice(-4)}` : 'Not connected'}
            </p>
            <p className="text-sm text-gray-500 mb-2">{profile.bio || "No bio yet"}</p>
            <div className="flex mt-2 justify-center md:justify-start">
              <button className="rounded-full font-medium text-sm bg-white/0 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {profile.follower || 0} Follower
              </button>
              <button className="rounded-full font-medium text-sm bg-white/0 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                {profile.following || 0} Following
              </button>
            </div>
            <div className="flex md:hidden flex-wrap gap-3 mt-4 justify-center">
              {paramAddress && paramAddress.toLowerCase() !== address?.toLowerCase() && (
                <>
                  <button onClick={() => navigate(`/chat/${paramAddress}`)} className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                    <MdOutlineChat className="text-lg items-center mr-1"/>Chat
                  </button>
                  <button
                    onClick={handleFollowToggle}
                    className={`flex px-4 py-2 rounded-full text-sm font-semibold transition ${
                      isFollowing
                        ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <MdGroupAdd className="text-lg mr-1" />
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </>
              )}

              {isConnected && (!paramAddress || paramAddress.toLowerCase() === address?.toLowerCase()) && (
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
        {isConnected && targetAddress && (
          <div className="hidden md:flex gap-3 mt-2">
            {paramAddress && paramAddress.toLowerCase() !== address?.toLowerCase() && (
              <>
                <button
                  onClick={() => navigate(`/chat/${paramAddress}`)}
                  className="flex bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                >
                  <MdOutlineChat className="text-lg items-center mr-1"/>Chat
                </button>
                <button
                  onClick={handleFollowToggle}
                  className={`flex px-4 py-2 rounded-full text-sm font-semibold transition ${
                    isFollowing
                      ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <MdGroupAdd className="text-lg mr-1" />
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </>
            )}

            {(!paramAddress || paramAddress.toLowerCase() === address?.toLowerCase()) && (
              <button
                className="flex bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition text-sm"
                onClick={() => setIsModalOpen(true)}
              >
                <FaUserGear className="text-lg items-center mr-1"/> Edit
              </button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-2 max-w-lg w-full relative">
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
                setAvatarError(false); // Reset error on save
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
