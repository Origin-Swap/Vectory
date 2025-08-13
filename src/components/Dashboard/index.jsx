import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { useAccount } from 'wagmi';
import axios from 'axios';
import { useAccountSupra } from "../../context/account";

const Dashboard = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useAccountSupra();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk popup check-in
  const [showCheckin, setShowCheckin] = useState(false);
  const [checkedInDays, setCheckedInDays] = useState([]);
  const [todayIndex, setTodayIndex] = useState(null);
  const rewards = [10, 10, 10, 10, 10, 10, 100];

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`http://localhost:5004/api/user/${address}`);
        const profile = profileRes.data.data;

        const rankRes = await axios.get(`http://localhost:5004/api/user/rank/${address}`);
        const rankData = rankRes.data;

        const leaderboardRes = await axios.get(`http://localhost:5004/api/user/leaderboard?limit=10`);
        const leaderboardArr = leaderboardRes.data.data.map((item, idx) => ({
          rank: idx + 1,
          username: item.username,
          points: item.totalPoint,
          isCurrent: item.address === address,
        }));

        setUserData({
          username: profile.username,
          email: profile.email,
          bio: profile.bio,
          avatar: profile.avatar,
          follower: profile.follower || 0,
          following: profile.following || 0,
          totalPoint: profile.totalPoint || 0,
          currentPoint: profile.currentPoint || 0,
          claimedPoint: profile.claimedPoint || 0,
          invites: profile.invites || 0,
          rank: rankData.rank,
          level: profile.level,
          progress: profile.progress || 0,
          isCreator: profile.isCreator || false,
          isContributor: profile.isContributor || false,
          recentActivities: profile.recentActivities || [],
          leaderboard: leaderboardArr,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  // Load check-in data dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkedInDays")) || [];
    setCheckedInDays(saved);

    const today = new Date().toISOString().split("T")[0];
    const startDate = JSON.parse(localStorage.getItem("checkInStartDate")) || today;

    if (!localStorage.getItem("checkInStartDate")) {
      localStorage.setItem("checkInStartDate", JSON.stringify(today));
    }

    const diffDays = Math.floor((new Date(today) - new Date(startDate)) / (1000 * 60 * 60 * 24)) % 7;
    setTodayIndex(diffDays);
  }, []);

  const handleCheckIn = (dayIndex) => {
    if (checkedInDays.includes(dayIndex)) return;
    const updated = [...checkedInDays, dayIndex];
    setCheckedInDays(updated);
    localStorage.setItem("checkedInDays", JSON.stringify(updated));
    alert(`✅ Check-in berhasil! +${rewards[dayIndex]} points`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Failed to load data</div>;
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 mt-14 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ====== HEADER ====== */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <button
            onClick={() => setShowCheckin(true)}
            className="px-4 py-2 bg-yellow-200 hover:bg-blue-700 text-gray-800 rounded-lg transition-colors"
          >
            Checkin
          </button>
        </div>

        {/* ====== STATS CARDS ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={userData.avatar || '/images/default-avatar.png'} alt="avatar" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{userData.username}</h2>
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

          {/* Points Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Points Progress</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span>Level Progress</span>
                <span>{userData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${userData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Referral Program</h3>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{userData.invites}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Successful Invites</p>
              </div>
            </div>
          </div>
        </div>

        {/* ====== LEADERBOARD ====== */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Leaderboard</h2>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Points</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {userData.leaderboard.map((user) => (
                <tr key={user.rank} className={user.isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                  <td className="px-6 py-4">#{user.rank}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">
                    {(user.points || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* POPUP DAILY CHECK-IN */}
        {showCheckin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg relative">
              <button
                onClick={() => setShowCheckin(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              <h2 className="flex gap-x-2 text-xl font-bold mb-4 text-gray-800 dark:text-white justify-center items-center">
                <PiCalendarCheckDuotone className="w-6 h-6 text-center items-center"/> Daily Reward
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {rewards.map((points, index) => {
                  const isChecked = checkedInDays.includes(index);
                  const isToday = index === todayIndex;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 shadow ${
                        isChecked
                          ? "bg-green-100 dark:bg-green-900 border-green-500"
                          : isToday
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300"
                      }`}
                    >
                      <div className="text-lg font-bold mb-1">{`Day ${index + 1}`}</div>
                      <div className="flex items-center gap-x-1 text-sm">{points}<img src="/images/point-image.png" className="w-5 h-5" /></div>
                      <button
                        disabled={isChecked || !isToday}
                        onClick={() => handleCheckIn(index)}
                        className={`mt-3 px-2 py-1 rounded text-xs font-medium ${
                          isChecked
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : isToday
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        {isChecked ? "Checked In" : isToday ? "Check In" : "Locked"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
