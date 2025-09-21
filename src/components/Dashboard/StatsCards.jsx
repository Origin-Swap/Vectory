// src/components/Dashboard/StatsCards.jsx
import React from "react";
import { Link } from "react-router-dom";
import ReferralCard from "./ReferralCard";
import { LuBadgeCheck } from "react-icons/lu";

const StatsCards = ({ userData, address }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* User Info */}
      <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={userData.avatar || '/images/avatar-image.png'} alt="avatar" />
          </div>
          <div>
            <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white">
              {userData.username}
              {userData.level === "Silver" && (
                <LuBadgeCheck className="w-6 h-6 text-white fill-blue-500" />
              )}
              {userData.level === "Gold" && (
                <LuBadgeCheck className="w-6 h-6 text-white fill-yellow-400" />
              )}
            </h2>
            <p className="text-blue-600 dark:text-blue-400">{userData.level} Member</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your Rank</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">#{userData.rank}</p>
          </div>
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Points</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{userData.totalPoint.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Points Progress</h3>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>Level Progress ({userData.level})</span>
            <span>{userData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${userData.progress}%` }}
            ></div>
          </div>
          <div className="flex mt-6 gap-x-4">
            {userData.level !== "Gold" && (
              <Link
                to="/level-upgrade"
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                Upgrade Level
              </Link>
            )}
            <Link
              to="/point-exchange"
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
            >
              Exchange Points
            </Link>
          </div>
        </div>
      </div>

      {/* Referral */}
      <ReferralCard invites={userData.invites} address={address} />
    </div>
  );
};

export default StatsCards;
