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
  const [pointHistory, setPointHistory] = useState([]);
  const rewards = [10, 20, 30, 40, 50, 60, 100];

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
    const fetchCheckinData = async () => {
      try {
        const res = await axios.get(`http://localhost:5004/api/user/${address}/history`);
        const history = res.data.data || [];

        setPointHistory(history); // simpan untuk tabel

        const today = new Date().toISOString().split("T")[0];
        const startDate = history.length > 0 ? history[0].date : today;

        // Tentukan index hari ini
        const diffDays = Math.floor((new Date(today) - new Date(startDate)) / (1000 * 60 * 60 * 24)) % 7;
        setTodayIndex(diffDays);

        // Tandai hari yang sudah di-check-in
        const checkedDays = history.map((h) => {
          const dayDiff = Math.floor((new Date(h.date) - new Date(startDate)) / (1000 * 60 * 60 * 24)) % 7;
          return dayDiff;
        });
        setCheckedInDays(checkedDays);
      } catch (err) {
        console.error("Gagal load check-in history:", err);
      }
    };

    if (address) {
      fetchCheckinData();
    }
  }, [address]);



  const handleCheckIn = async (dayIndex) => {
    if (checkedInDays.includes(dayIndex)) return;
    try {
      await axios.post("http://localhost:5004/api/user/checkin", {
        address,
        points: rewards[dayIndex]
      });

      // Reload data dari backend
      const res = await axios.get(`http://localhost:5004/api/user/${address}/history`);
      const history = res.data.data || [];

      const startDate = history.length > 0 ? history[0].date : new Date().toISOString().split("T")[0];
      const checkedDays = history.map((h) => {
        const dayDiff = Math.floor((new Date(h.date) - new Date(startDate)) / (1000 * 60 * 60 * 24)) % 7;
        return dayDiff;
      });
      setCheckedInDays(checkedDays);

      alert(`✅ Check-in berhasil! +${rewards[dayIndex]} points`);
    } catch (err) {
      alert(err.response?.data?.message || "Error saat check-in");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("referrer", ref);
    }
  }, []);

  useEffect(() => {
    console.log("Referral effect triggered", { isConnected, address });
    const referrer = localStorage.getItem("referrer");
    console.log("Referrer found in localStorage:", referrer);

    if (isConnected && address && referrer) {
      axios.post("http://localhost:5004/api/user/referral", {
        referrerAddress: referrer,
        newUserAddress: address
      })
      .then(() => {
        console.log("✅ Referral sent to backend");
        localStorage.removeItem("referrer");
      })
      .catch(err => console.error("❌ Referral error:", err));
    }
  }, [isConnected, address]);



  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Please update your profile first</div>;
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
          <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
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
          <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
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
          <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Referral Program
            </h3>

            {/* Jumlah Referral */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userData.invites}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Successful Invites
                </p>
              </div>
            </div>

            {/* Referral Link */}
            <div className="mb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Your Referral Link
              </p>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={`http://localhost:5173/?ref=${address}`}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:5173/?ref=${address}`);
                    alert("✅ Referral link copied!");
                  }}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-lg"
                >
                  Copy
                </button>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl relative">
              {/* Tombol Close */}
              <button
                onClick={() => setShowCheckin(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>

              {/* Judul */}
              <h2 className="flex gap-x-2 text-xl font-bold mb-6 text-gray-800 dark:text-white justify-center items-center">
                <PiCalendarCheckDuotone className="w-6 h-6" /> Daily Reward
              </h2>

              {/* Grid */}
              <div className="grid grid-cols-3 gap-4">
                {rewards.map((points, index) => {
                  const isChecked = checkedInDays.includes(index);
                  const isToday = index === todayIndex;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 shadow-md transition-transform transform hover:scale-105 ${
                        isChecked
                          ? "bg-green-100 dark:bg-green-900 border-green-500"
                          : isToday
                          ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300"
                      } ${index === rewards.length - 1 ? "col-span-3" : ""}`}
                    >
                      <div className="text-lg font-bold mb-1">{`Day ${index + 1}`}</div>
                      <div className="flex items-center gap-x-1 text-sm">
                        {points}
                        <img src="/images/point-image.png" className="w-5 h-5" />
                      </div>
                      <button
                        disabled={isChecked || !isToday}
                        onClick={() => handleCheckIn(index)}
                        className={`mt-3 px-3 py-1 rounded text-xs font-medium shadow ${
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

        {/* ====== POINT HISTORY ====== */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Riwayat Poin</h2>
          {pointHistory.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Kegiatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Jumlah Poin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pointHistory.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4">Daily Check-in</td>
                    <td className="px-6 py-4">{item.points}</td>
                    <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Belum ada riwayat poin.</p>
          )}
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
