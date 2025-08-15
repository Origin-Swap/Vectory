import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostDetail from "../../components/Social/PostDetail";
import { IoIosArrowRoundBack } from "react-icons/io";

// Dummy source — ganti dengan fetch by id dari backend
const MOCK = {
  p1: {
    id: "p1",
    author: { name: "Luna", handle: "@lunaart", avatar: "https://i.pravatar.cc/100?img=5" },
    createdAt: new Date().toISOString(),
    content: "Karya baru! NFT sketsa digital #01",
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop",
    likes: 23,
    comments: [
      { id: "c1", author: { name: "Riko", avatar: "https://i.pravatar.cc/100?img=12" }, text: "Keren banget!" },
      { id: "c2", author: { name: "Mila", avatar: "https://i.pravatar.cc/100?img=32" }, text: "Bisa mint edisi terbatas?" },
    ],
  },
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [store, setStore] = useState(MOCK);

  const post = useMemo(() => store[id], [id, store]);

  const like = () => {
    setStore((prev) => ({
      ...prev,
      [id]: { ...prev[id], likes: prev[id].likes + 1 },
    }));
  };

  const addComment = (text) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: { name: "You", avatar: "https://i.pravatar.cc/100?img=15" },
      text,
    };
    setStore((prev) => ({
      ...prev,
      [id]: { ...prev[id], comments: [...prev[id].comments, newComment] },
    }));
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-lg font-semibold">Post tidak ditemukan</div>
          <Link to="/" className="mt-3 inline-block px-4 py-2 rounded-xl border">Kembali</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/75 border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/socialfi" className="flex px-3 py-1 items-center rounded-lg border"><IoIosArrowRoundBack className="w-5 h-5"/> Back to Feed</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-2">
        <PostDetail post={post} onLike={like} onAddComment={addComment} />
      </main>
    </div>
  );
}
