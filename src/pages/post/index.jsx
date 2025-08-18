// File: src/pages/Social/IndexPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Post from "../../components/Social/Post";
import CreatePost from "../../components/Social/CreatePost";
import { useAccountSupra } from "../../context/account";

export default function IndexPage() {
  const { isConnected, address } = useAccountSupra();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("forYou");

  // 🚀 Ambil data dari backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5004/api/post");
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

    if (activeTab === "hot") {
      sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (activeTab === "mostView") {
      sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    if (!query) return sorted;
    return sorted.filter((p) =>
      `${p.author?.name || ""} ${p.author?.address || ""} ${p.content}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [posts, query, activeTab]);

  // 🚀 Like handler (pakai router /api/like/add)
  const handleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
    try {
      await axios.post(`http://localhost:5004/api/like/add`, {
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
    <div className="min-h-screen bg-white text-gray-900 mt-14">
      <main className="max-w-3xl mx-auto px-2 py-4">
        {isConnected && <CreatePost onCreate={handleCreatePost} />}

        {/* Tabs */}
        <div className="flex gap-2 my-4 justify-center text-xs">
          <button
            className={`px-2 py-1 ${
              activeTab === "forYou"
                ? "border-b-2 border-gray-400 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("forYou")}
          >
            For You
          </button>
          <button
            className={`px-2 py-1 ${
              activeTab === "hot"
                ? "border-b-2 border-gray-400 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("hot")}
          >
            Hot Topic
          </button>
          <button
            className={`px-2 py-1 ${
              activeTab === "mostView"
                ? "border-b-2 border-gray-400 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("mostView")}
          >
            Most View
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-2">
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
  );
}
