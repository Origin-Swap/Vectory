// pages/Social/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAccountSupra } from "../../context/account";

export default function ChatPage() {
  const { address } = useAccountSupra();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // lawan chat
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // scroll ke bawah tiap update pesan
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Ambil daftar percakapan
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5004/api/chat/conversations/${address}`
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Gagal ambil conversations:", err);
      }
    };
    fetchConversations();
  }, [address]);

  // Ambil chat dengan lawan aktif
  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5004/api/chat/between/${address}/${activeChat.address}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Gagal ambil chat:", err);
      }
    };
    fetchMessages();
  }, [activeChat, address]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !activeChat) return;
    try {
      const res = await axios.post("http://localhost:5004/api/chat/send", {
        senderAddress: address,
        receiverAddress: activeChat.address,
        message: text,
      });
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row max-w-5xl mx-auto">
      {/* Daftar percakapan */}
      <div className="w-full md:w-1/3 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <div className="space-y-2">
          {conversations.map((c) => (
            <div
              key={c.address}
              onClick={() => setActiveChat(c)}
              className={`flex items-center gap-3 p-3 rounded-xl shadow cursor-pointer hover:bg-gray-100 ${
                activeChat?.address === c.address ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={c.avatar || "/images/default-avatar.png"}
                alt={c.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">{c.username || "Anon"}</div>
                <div className="text-gray-500 text-sm truncate">
                  {c.lastMessage}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(c.updatedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="text-gray-500 text-center py-4">No chats yet</div>
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col h-screen">
        {activeChat ? (
          <>
            <div className="p-4 bg-white border-b font-semibold">
              Chat with {activeChat.username || "Anon"}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.senderAddress === address ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl max-w-xs ${
                      m.senderAddress === address
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-900"
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
