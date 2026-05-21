// File: src/pages/PointSwap.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../../config/ApiUrl';
import { useAccount } from "wagmi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function PointSwap() {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [pointsToSwap, setPointsToSwap] = useState("");
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const [loading, setLoading] = useState(false);

  // ⚡ Rate swap
  const RATE = 100; // 100 points = 1 token
  const MIN_SWAP = 2500; // minimum swap 2,500 points

  useEffect(() => {
    if (!address) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/${address}`);
        setUserData(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      }
    };
    fetchData();
  }, [address]);

  useEffect(() => {
    const val = parseInt(pointsToSwap || "0", 10);
    if (isNaN(val) || val <= 0) {
      setTokenEstimate(0);
      return;
    }
    setTokenEstimate(val / RATE);
  }, [pointsToSwap]);

  const handleSwap = async () => {
    if (!address || !userData) {
      alert("Connect wallet dulu");
      return;
    }
    const swapVal = parseInt(pointsToSwap);
    if (!swapVal || swapVal <= 0) {
      alert("Masukkan jumlah point valid");
      return;
    }
    if (swapVal < MIN_SWAP) {
      alert(`Minimal swap adalah ${MIN_SWAP} Points`);
      return;
    }
    if (swapVal > userData.totalPoint) {
      alert("Point tidak cukup");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/user/swap`, {
        address,
        points: swapVal,
      });

      if (res.data.success) {
        alert(`🎉 Berhasil swap ${swapVal} point → ${tokenEstimate} Token`);
        setUserData((prev) => ({
          ...prev,
          totalPoint: prev.totalPoint - swapVal,
        }));
        setPointsToSwap("");
      } else {
        alert(res.data.message || "Swap gagal");
      }
    } catch (err) {
      console.error("Swap error:", err);
      alert("Swap gagal, cek console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-12 md:px-4 px-2">
      <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-6 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <IoIosArrowRoundBack className="w-5 h-5" /> Back
        </button>

        <h1 className="text-3xl text-center font-extrabold text-gray-800 dark:text-white mb-2">
          Swap Points ✨
        </h1>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
          Swap your point to $KT tokens. <br />
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Minimal swap: {MIN_SWAP} Points
          </span>
        </p>

        {userData ? (
          <div>
            {/* Info total points */}
            <div className="mb-6 bg-indigo-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Total Points
              </p>
              <p className="flex justify-center items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {userData.totalPoint} <img src="/images/point-image.png" className="ml-1 w-6 h-6" />
              </p>
            </div>

            {/* Input swap */}
            <div className="mb-6">
              <label className="block text-center text-sm mb-2 text-gray-600 dark:text-gray-300 font-medium">
                Enter Points
              </label>
              <input
                type="number"
                value={pointsToSwap}
                onChange={(e) => setPointsToSwap(e.target.value)}
                placeholder={`Min. ${MIN_SWAP} Points`}
                className="w-full text-center border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            {/* Estimasi */}
            <div className="mb-6 bg-gray-50 text-center dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Estimasi Tokens
              </p>
              <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                {tokenEstimate} $KT
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Rate: <span className="font-medium">100 Points = 1 $KT</span>
              </p>
            </div>

            {/* Tombol swap */}
            <button
              onClick={handleSwap}
              disabled={loading || !pointsToSwap}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50 transition transform hover:scale-[1.02]"
            >
              {loading ? "⏳ Processing..." : "🚀 Redeem Now"}
            </button>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Loading user data...
          </p>
        )}
      </div>
    </div>
  );
}
