import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import mockUser from "../../data/mockUser";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdOutlineChat } from "react-icons/md";
import ProductList from "./ProductList";
import SalesHistory from "./SalesHistory";
import PurchaseHistory from "./PurchaseHistory";
import PointHistory from "./PointHistory";


const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const user = mockUser;
  const [isFollowing, setIsFollowing] = useState(false);

  const tabs = [
    { key: "products", label: "Products" },
    { key: "sales", label: "Sales History" },
    { key: "purchases", label: "Purchase History" },
    { key: "points", label: "Point History" },
  ];

  return (
    <div className="mx-auto">
      {/* Banner */}
      {/* Wrapper utama relative */}
      <div className="relative mb-16">
        {/* Banner */}
        <div className="h-40 md:h-52 rounded-b-lg shadow overflow-hidden">
          <img
            src={user.banner}
            alt="Banner"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Avatar di luar banner, tapi masih dalam relative parent */}
        <div className="absolute -bottom-14 left-4 md:left-6 z-10">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 bg-white md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
            loading="lazy"
          />
        </div>
      </div>


      {/* Info Section */}
      <div className="px-4 md:px-6 -mt-22">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center text-2xl font-bold">{user.name}<img src="/images/bagde/contstributor.png" loading="leazy" className="w-6 h-6 ml-2 "/></h2>
      </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
          <div className="gap-x-2"><strong>Products:</strong> {user.products}</div>
          <div className="gap-x-2"><strong>Following:</strong> {user.following}</div>
          <div className="gap-x-2"><strong>Followers:</strong> {user.followers}</div>
          <div className="flex items-center gap-1">
            <strong>Rating:</strong> <FaStar className="text-yellow-400" /> {user.rating}
          </div>
          <div className="gap-x-2"><strong>Joined:</strong> {user.joinDate}</div>
          <div className="gap-x-2"><strong>Points:</strong> {user.points}</div>
        </div>
      </div>

      <div className="flex gap-x-2 mt-4 px-4 md:px-6">
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`flex items-center gap-2 px-4 py-1 text-sm rounded-full border transition ${
          isFollowing
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isFollowing ? (
          <>
            <RiUserUnfollowLine className="text-lg" />
            Unfollow
          </>
        ) : (
          <>
            <MdOutlinePersonAddAlt className="text-lg" />
            Follow
          </>
        )}
      </button>
      <button
        className="flex border border-gray-500 items-center gap-2 px-4 py-1 text-sm rounded-full border transition"
      >
      <MdOutlineChat className="text-lg" />
      Chat
      </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 ">
        <div className="flex border-b border-t px-4 md:px-6 mb-4 gap-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.key
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border p-4 rounded shadow-sm">
        {activeTab === "products" && <ProductList />}
        {activeTab === "sales" && <SalesHistory />}
        {activeTab === "purchases" && <PurchaseHistory />}
        {activeTab === "points" && <PointHistory />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
