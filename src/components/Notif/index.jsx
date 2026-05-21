import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../../config/ApiUrl';
import { useAccount } from "wagmi";

const TabPage = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("new");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil notifikasi dari backend
  useEffect(() => {
    if (!address) return;

    const fetchNotifs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/notification/${address}`);
        setNotifications(res.data.data || []);
      } catch (err) {
        console.error("Gagal fetch notifikasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifs();
  }, [address]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`${API_URL}/api/notification/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Gagal update notifikasi:", err);
    }
  };

  const filteredNotifications = notifications.filter((notif) =>
    activeTab === "new" ? !notif.isRead : notif.isRead
  );

  return (
    <div className="w-full min-h-screen md:px-4 px-2 py-2 mt-16">
      {/* Tab */}
      <div className="flex justify-center space-x-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => handleTabClick("new")}
          className={`text-sm font-semibold py-1 px-4 rounded-t-lg transition-colors duration-300 ${
            activeTab === "new"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          New
        </button>
        <button
          onClick={() => handleTabClick("read")}
          className={`text-sm font-semibold py-1 px-4 rounded-t-lg transition-colors duration-300 ${
            activeTab === "read"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Read
        </button>
      </div>

      {/* List notif */}
      <div className="mt-2 space-y-2">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center text-gray-500">No notifications</div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white shadow rounded-lg p-4 border cursor-pointer transition
              ${notif.isRead ? "opacity-70" : "hover:bg-gray-50"}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <img
                  src={notif.actor?.avatar || "/images/avatar-image.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border"
                />

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-md font-bold text-gray-800">
                    {notif.actor?.username || notif.actorAddress} – {notif.message}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabPage;
