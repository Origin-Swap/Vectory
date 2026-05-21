import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/ApiUrl";
import { useAccount } from "wagmi";
import { IoListOutline } from "react-icons/io5";

export default function ChatList() {
  const { address } = useAccount();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chat/conversations/${address}`);
        setConversations(res.data);
      } catch (err) {
        console.error("Gagal ambil percakapan:", err);
      }
    };
    if (address) fetchConversations();
  }, [address]);

  // fungsi bantu untuk format waktu
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();

    // kalau masih hari ini → tampilkan jam saja
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // kalau beda hari → tampilkan tanggal singkat
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4">
      <h1 className="flex items-center gap-x-2 text-xl font-bold mb-4">
        <IoListOutline className="h-6 w-6" /> Chat List
      </h1>
      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversation found</p>
      ) : (
        <ul className="space-y-2">
          {conversations.map((c) => (
            <li
              key={c.chatWithAddress}
              className="p-3 border rounded-lg hover:bg-gray-50"
            >
              <Link
                to={`/chat/${c.chatWithAddress}`}
                className="flex items-center gap-3 justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar || "/images/avatar-image.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{c.username || c.chatWithAddress}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {c.lastMessage}
                    </div>
                  </div>
                </div>
                {/* 🕒 waktu terakhir pesan */}
                <div className="text-xs text-gray-400">
                  {formatTime(c.updatedAt)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
