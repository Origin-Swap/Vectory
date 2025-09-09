import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { useAccount } from 'wagmi';
import axios from 'axios';
import { API_URL } from "../../config/ApiUrl";
import { useAccountSupra } from "../../context/account";
import ReferralCard from "../../components/Dashboard/ReferralCard";

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
        const profileRes = await axios.get(`https://towerpad.online/api/user/${address}`);
        const profile = profileRes.data.data;

        const rankRes = await axios.get(`https://towerpad.online/api/user/rank/${address}`);
        const rankData = rankRes.data;

        const leaderboardRes = await axios.get(`https://towerpad.online/api/user/leaderboard?limit=10`);
        const leaderboardArr = leaderboardRes.data.data.map((item, idx) => ({
          rank: idx + 1,
          username: item.username,
          address: item.address,
          points: item.totalPoint,
          isCurrent: item.address === address,
        }));

        setUserData({
          address: profile.address,
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
          isCreator: profile.isCreator || false,
          isContributor: profile.isContributor || false,
          recentActivities: profile.recentActivities || [],
          leaderboard: leaderboardArr,
          progress: (() => {
            const tp = profile.totalPoint || 0;
            if (tp < 2500) return Math.floor((tp / 2500) * 100);
            if (tp < 5000) return Math.floor(((tp - 2500) / 2500) * 100);
            return 100;
          })(),
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
        const res = await axios.get(`https://towerpad.online/api/user/${address}/history`);
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
      await axios.post("https://towerpad.online/api/user/checkin", {
        address,
        points: rewards[dayIndex]
      });

      // Reload data dari backend
      const res = await axios.get(`https://towerpad.online/api/user/${address}/history`);
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
    const referrer = localStorage.getItem("referrer");
    if (isConnected && address && referrer) {
      console.log("Sending referral:", { referrer, newUser: address });
      axios.post("https://towerpad.online/api/user/referral", {
        referrerAddress: referrer.toLowerCase(),
        newUserAddress: address.toLowerCase()
      })
      .then(res => {
        console.log("✅ Referral response:", res.data);
        localStorage.removeItem("referrer");
      })
      .catch(err => console.error("❌ Referral error:", err.response?.data || err));
    }
  }, [isConnected, address]);


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  if (!isConnected || !address) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500 gap-4">
        <p>Please connect your wallet first</p>
        <button
          onClick={connectWallet}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500 gap-4">
        <p>Please update your profile first</p>
        <Link
          to="/profile"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Go to Profile
        </Link>
      </div>
    );
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
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {userData.username}
                {userData.level && (
                  <img
                    src={`/images/badge/${userData.level.toLowerCase()}.png`}
                    alt={`${userData.level} badge`}
                    className="ml-1 w-6 h-6 inline-block"
                  />
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

          <ReferralCard invites={userData.invites} address={address} />

        </div>

        {/* ====== LEADERBOARD ====== */}
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
              {userData.leaderboard.slice(0, 10).map((user) => {
                const displayName =
                  user.username && user.username.trim() !== ""
                    ? user.username
                    : user.address
                    ? `${user.address.slice(0, 4)}...${user.address.slice(-4)}`
                    : "Anon";

                // tentukan badge untuk rank 1, 2, 3
                let trophy = null;
                if (user.rank === 1) {
                  trophy = <img src="/images/badge/gold-trophy.png" alt="Gold Trophy" className="inline-block w-8 h-8 ml-2" />;
                } else if (user.rank === 2) {
                  trophy = <img src="/images/badge/silver-trophy.png" alt="Silver Trophy" className="inline-block w-7 h-7 ml-2" />;
                } else if (user.rank === 3) {
                  trophy = <img src="/images/badge/bronze-trophy.png" alt="Bronze Trophy" className="inline-block w-6 h-6 ml-2" />;
                }

                return (
                  <tr
                    key={user.rank}
                    className={user.isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                  >
                    <td className="px-6 py-4">#{user.rank}</td>
                    <td className="px-6 py-4 my-text flex items-center">
                     {trophy}
                      {displayName}
                    </td>
                    <td className="px-6 py-4">
                      {(user.points || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
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
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Point History</h2>
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
                {pointHistory
                  .slice(-10) // 🔥 ambil 10 data terakhir
                  .reverse() // opsional → supaya yang terbaru tampil di atas
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4">Daily Check-in</td>
                      <td className="px-6 py-4">{item.points}</td>
                      <td className="px-6 py-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
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
