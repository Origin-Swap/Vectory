// src/components/Social/CommentForm.jsx
import React, { useState, useEffect } from "react";
import { API_URL } from '../../config/ApiUrl';
import { useAccount } from "wagmi";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");
  const { address } = useAccountSupra();
  const [profile, setProfile] = useState({
    avatar: "/images/avatar-image.png",
  });


  // Ambil data user dari backend
  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/${address}`);
        if (res.status === 404) {
          console.log("User not found, using default profile");
          setProfile({ avatar: "/images/default-avatar.png" });
          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [address]);


  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (onSubmit) onSubmit(text.trim()); // 🚀 kirim balik ke parent
    setText("");
  };

  return (
    <form onSubmit={submit} className="mt-4">
      <div className="flex gap-3">
        {/* Avatar user aktif */}
        <img
          src={profile?.avatar || "/images/avatar-image.png"}
          alt="me"
          className="w-8 h-8 rounded-full"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write Comments…"
          className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm"
        >
          Send
        </button>
      </div>
    </form>
  );
}
