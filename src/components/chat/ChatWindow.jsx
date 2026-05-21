import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../config/ApiUrl";
import { useParams, Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ChatWindow() {
  const { address } = useAccount();
  const { chatWithAddress } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverProfile, setReceiverProfile] = useState(null);
  const scrollRef = useRef();

  // Ambil profil lawan chat
  useEffect(() => {
    const fetchProfile = async () => {
      if (!chatWithAddress) return;
      try {
        const res = await axios.get(`${API_URL}/api/user/${chatWithAddress}`);
        setReceiverProfile(res.data.data);
      } catch (err) {
        console.error("Gagal ambil profil user:", err);
      }
    };
    fetchProfile();
  }, [chatWithAddress]);

  // Ambil chat (sekali + polling otomatis)
  useEffect(() => {
    let intervalId;

    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/chat/between/${address}/${chatWithAddress}`
        );
        setMessages(res.data);
        scrollToBottom();
      } catch (err) {
        console.error("Gagal ambil chat:", err);
      }
    };

    if (address && chatWithAddress) {
      fetchChats();
      // polling tiap 3 detik
      intervalId = setInterval(fetchChats, 3000);
    }

    return () => clearInterval(intervalId);
  }, [address, chatWithAddress]);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/api/chat/send`, {
        senderAddress: address,
        receiverAddress: chatWithAddress,
        message: input.trim(),
      });

      setMessages((prev) => [...prev, res.data]);
      setInput("");
      scrollToBottom();
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <div className="mx-auto border rounded-xl shadow-lg flex flex-col h-[520px] bg-white mt-16">
      {/* Header */}
      <div className="md:hidden block p-4 border-b font-semibold flex items-center justify-between">
      <Link to="/chat" className="flex px-3 py-1 items-center rounded-lg border">
        <IoIosArrowRoundBack className="w-5 h-5" /> Back to Chat
      </Link>
        <span className="text-sm text-gray-500">
          {receiverProfile?.username || chatWithAddress}
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">No Data</div>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderAddress === address;
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar tampil kalau bukan kita */}
                {!isSender && (
                  <img
                    src={msg.sender?.avatar || "/images/avatar-image.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                )}

                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] break-words ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Avatar tampil kalau kita sendiri */}
                {isSender && (
                  <img
                    src={receiverProfile?.avatar || "/images/avatar-image.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                )}
              </div>
            );
          })
        )}
      </div>


      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          className="flex-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
