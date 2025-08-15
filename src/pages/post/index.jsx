import React, { useState, useMemo } from "react";
import Post from "../../components/Social/Post";
import CreatePost from "../../components/Social/CreatePost";
import { useAccountSupra } from "../../context/account";

const initialPosts = [
  {
    id: "p1",
    author: { name: "Luna", handle: "@lunaart", avatar: "https://i.pravatar.cc/100?img=5" },
    createdAt: new Date().toISOString(),
    content: "Karya baru! NFT sketsa digital #01",
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop",
    likes: 23,
    views: 150,
    comments: [
      { id: "c1", author: { name: "Riko", avatar: "https://i.pravatar.cc/100?img=12" }, text: "Keren banget!" },
      { id: "c2", author: { name: "Mila", avatar: "https://i.pravatar.cc/100?img=32" }, text: "Bisa mint edisi terbatas?" },
    ],
  },
  {
    id: "p2",
    author: { name: "Adit", handle: "@aditbeats", avatar: "https://i.pravatar.cc/100?img=8" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    content: "Drop audio loop 120bpm. Open feedback 🙌",
    image: "",
    likes: 5,
    views: 80,
    comments: [],
  },
];

export default function IndexPage() {
  const { isConnected } = useAccountSupra();
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("forYou");

  const filtered = useMemo(() => {
    let sorted = [...posts];

    if (activeTab === "hot") {
      sorted.sort((a, b) => b.likes - a.likes);
    } else if (activeTab === "mostView") {
      sorted.sort((a, b) => b.views - a.views);
    }

    if (!query) return sorted;
    return sorted.filter((p) =>
      `${p.author.name} ${p.author.handle} ${p.content}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [posts, query, activeTab]);

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (text) => {
    setPosts((prev) => [
      {
        id: `p${Date.now()}`,
        author: { name: "You", handle: "@you", avatar: "https://i.pravatar.cc/100?img=15" },
        createdAt: new Date().toISOString(),
        content: text,
        image: "",
        likes: 0,
        views: 0,
        comments: [],
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 mt-14">
      {/* Topbar
      <header className="sticky top-0 z-20 backdrop-blur bg-white/75 border-b">
        <div className="max-w-3xl mx-auto py-2 flex items-center gap-3">
          <h1 className="text-xl font-semibold">SocialFi</h1>
          <div className="ml-auto w-full max-w-sm">
            <input
              placeholder="Cari post, creator, tag…"
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header> */}

      <main className="max-w-3xl mx-auto px-2 py-4">
        {isConnected && <CreatePost onCreate={handleCreatePost} />}
        {/* Tabs */}
        <div className="flex gap-2 my-4 justify-center text-xs ">
          <button
            className={`px-2 py-1 ${activeTab === "forYou" ? "border-b-2 border-gray-400 font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("forYou")}
          >
            For You
          </button>
          <button
            className={`px-2 py-1 ${activeTab === "hot" ? "border-b-2 border-gray-400 font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("hot")}
          >
            Hot Topic
          </button>
          <button
            className={`px-2 py-1 ${activeTab === "mostView" ? "border-b-2 border-gray-400 font-semibold" : "text-gray-500"}`}
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
              Tidak ada hasil untuk "{query}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
