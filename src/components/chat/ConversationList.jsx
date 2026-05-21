import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/ApiUrl";
import { useAccount } from "wagmi";

export default function ChatWindow() {
  const { address } = useAccount();
  const { chatAddress } = useParams(); // lawan chat
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/chat/between/${address}/${chatAddress}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Gagal ambil chat:", err);
      }
    };
    fetchMessages();
  }, [address, chatAddress]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/api/chat/send`, {
        senderAddress: address,
        receiverAddress: chatAddress,
        message: text
      });
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
  };

  return (
    <div className="flex mt-16 flex-col h-screen max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.senderAddress === address ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-xl max-w-xs ${
                m.senderAddress === address ? "bg-blue-500 text-white" : "bg-white text-gray-900"
              }`}
            >
              {m.message}
              <div className="text-xs text-gray-300 mt-1 text-right">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-white flex items-center gap-2 border-t">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
