// components/Chat/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatBox({ userAddress, chatWithAddress }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  // 🚀 Ambil chat antara dua user
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://towerpad.online/api/chat/between/${userAddress}/${chatWithAddress}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Gagal ambil chat:", err);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    };
    fetchChats();
  }, [userAddress, chatWithAddress]);

  // 🚀 Kirim pesan
  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post("https://towerpad.online/api/chat/send", {
        senderAddress: userAddress,
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
    <div className="max-w-md mx-auto border rounded-xl shadow-lg flex flex-col h-[500px] bg-white">
      {/* Header */}
      <div className="p-4 border-b font-semibold flex items-center justify-between">
        <span>Chat</span>
        <span className="text-sm text-gray-500">{chatWithAddress}</span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50"
      >
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">Belum ada pesan</div>
        ) : (
          messages.map((msg) => {
            const isSender = msg.senderAddress === userAddress;
            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
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
