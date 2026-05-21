import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCalendarCheckDuotone } from "react-icons/pi";
import axios from 'axios';
import { API_URL } from "../../config/ApiUrl";
import { useAccount } from "wagmi";
import ReferralCard from "./ReferralCard";
import Header from "./Header";
import StatsCards from "./StatsCards";
import Leaderboard from "./Leaderboard";
import DailyCheckin from "./DailyCheckin";
import PointHistory from "./PointHistory";

const Dashboard = () => {
  const { address, isConnected, connectWallet, disconnectWallet } = useAccount();
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
        const profileRes = await axios.get(`${API_URL}/api/user/${address}`);
        const profile = profileRes.data.data;

        const rankRes = await axios.get(`${API_URL}/api/user/rank/${address}`);
        const rankData = rankRes.data;

        const leaderboardRes = await axios.get(`${API_URL}/api/user/leaderboard?limit=10`);
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
        const res = await axios.get(`${API_URL}/api/user/${address}/history`);
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
      await axios.post(`${API_URL}/api/user/checkin`, {
        address,
        points: rewards[dayIndex]
      });

      // Reload data dari backend
      const res = await axios.get(`${API_URL}/api/user/${address}/history`);
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
      axios.post(`${API_URL}/api/user/referral`, {
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
          {/* Header */}
          <Header onOpenCheckin={() => setShowCheckin(true)} />

          {/* Stats */}
          <StatsCards userData={userData} address={address} />

          {/* Leaderboard */}
          <Leaderboard leaderboard={userData.leaderboard} address={address} />

          {/* Point History */}
          <PointHistory pointHistory={pointHistory} />

          {/* Popup Daily Checkin */}
          {showCheckin && (
            <DailyCheckin
              rewards={rewards}
              checkedInDays={checkedInDays}
              todayIndex={todayIndex}
              onCheckIn={handleCheckIn}
              onClose={() => setShowCheckin(false)}
            />
          )}
        </div>
      </div>
    );
  };

export default Dashboard;
