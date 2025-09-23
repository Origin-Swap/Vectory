import React from "react";
import { useParams } from "react-router-dom";
import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";

export default function ChatPage() {
  const { chatWithAddress } = useParams();

  return (
    <div className="flex h-screen">
      {/* Chat List */}
      <div
        className={`
          w-full md:w-1/3 border-r
          ${chatWithAddress ? "hidden md:block" : "block"}
        `}
      >
        <ChatList />
      </div>

      {/* Chat Window */}
      <div
        className={`
          w-full md:flex-1
          ${chatWithAddress ? "block" : "hidden md:flex"}
        `}
      >
        {chatWithAddress ? (
          <ChatWindow />
        ) : (
          <div className="hidden md:flex items-center justify-center w-full text-gray-400">
            Pilih percakapan
          </div>
        )}
      </div>
    </div>
  );
}
