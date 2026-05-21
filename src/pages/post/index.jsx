// File: src/pages/Social/IndexPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from '../../config/ApiUrl';
import Post from "../../components/Social/Post";
import CreatePost from "../../components/Social/CreatePost";
import RecommendedUsers from "../../components/Social/RecommendedUsers";
import RecommendedUsersPhone from "../../components/Social/RecommendedUsersPhone";
import { useAccount } from "wagmi";

export default function IndexPage() {
  const { isConnected, address } = useAccount();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("forYou");

  // 🚀 Ambil data dari backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/post`);
        setPosts(res.data);
      } catch (err) {
        console.error("Gagal ambil posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // 🚀 Sorting + filter
  const filtered = useMemo(() => {
    let sorted = [...posts];

    if (activeTab === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeTab === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default "For You" → bisa custom algoritma, misalnya campuran
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (!query) return sorted;
    return sorted.filter((p) =>
      `${p.author?.name || ""} ${p.author?.address || ""} ${p.content}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [posts, query, activeTab]);

  // 🚀 Like handler
  const handleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
    try {
      await axios.post(`${API_URL}/api/like/add`, {
        address,
        postId,
      });
    } catch (err) {
      console.error("Gagal like post:", err);
    }
  };

  // 🚀 Tambah post baru ke state setelah create
  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-900 mt-14">
    <aside className="hidden md:block p-4">
    </aside>
      <div className="w-full md:w-7/12 border-r">
        <main className="max-w-5xl mx-auto py-4 px-2 md:p-4">
          {isConnected && <CreatePost onCreate={handleCreatePost} />}
          <RecommendedUsersPhone/>

          {/* Tabs */}
          <div className="flex gap-4 mb-4 text-sm font-medium flex-wrap">
            {[
              { id: "forYou", label: "For You" },
              { id: "newest", label: "Newest" },
              { id: "oldest", label: "Oldest" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-4  py-1 rounded ${
                  activeTab === tab.id
                    ? "border-b-2 card-bg rounded-xl border-[#F5E856] text-gray-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="space-y-3">
            {filtered.map((post) => (
              <Post key={post.id} post={post} onLike={() => handleLike(post.id)} />
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-sm text-gray-500">
                No Post Found {query}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ===== SIDEBAR ===== */}
      <aside className="hidden md:block w-5/12 p-4">
        <RecommendedUsers />
      </aside>
    </div>
  );
}
