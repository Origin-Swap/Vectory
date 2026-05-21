import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../../config/ApiUrl';
import PostDetail from "../../components/Social/PostDetail";
import { IoIosArrowRoundBack } from "react-icons/io";
import RecommendedUsers from "../../components/Social/RecommendedUsers";
import { useAccount } from "wagmi";

export default function PostDetailPage() {
  const { id } = useParams();
  const { address } = useAccount();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Ambil data post by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/post/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Gagal ambil post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 🚀 Like handler
  const handleLike = async () => {
    if (!post) return;
    try {
      await axios.post(`${API_URL}/api/like/add`, {
        address, // pakai address dari wallet user
        postId: post.id,
      });
      setPost((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    } catch (err) {
      console.error("Gagal like post:", err);
    }
  };

  // 🚀 Add comment handler
  const handleAddComment = async (text) => {
    try {
      const res = await axios.post(`${API_URL}/api/comment/add`, {
        address,
        postId: post.id,
        content: text,
      });

      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data],
      }));
    } catch (err) {
      console.error("Gagal tambah komentar:", err);
    }
  };

  // 🚀 Add reply handler
  const handleAddReply = async (parentId, text) => {
    try {
      const res = await axios.post(`${API_URL}/api/comment/reply`, {
        address,
        postId: post.id,
        content: text,
        parentId,
      });

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies || []), res.data] }
            : c
        ),
      }));
    } catch (err) {
      console.error("Gagal tambah reply:", err);
    }
  };

  // 🚀 Delete comment / reply handler
  const handleDeleteComment = async (commentId, parentId = null) => {
    try {
      await axios.delete(`${API_URL}/api/comment/${commentId}`);

      setPost((prev) => {
        if (!prev) return prev;

        // kalau comment top-level
        if (!parentId) {
          return {
            ...prev,
            comments: prev.comments.filter((c) => c.id !== commentId),
            commentsCount: (prev.commentsCount || 0) - 1, // sinkronkan count
          };
        }

        // kalau reply (nested)
        return {
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === parentId
              ? {
                  ...c,
                  replies: c.replies.filter((r) => r.id !== commentId),
                }
              : c
          ),
          commentsCount: (prev.commentsCount || 0) - 1,
        };
      });
    } catch (err) {
      console.error("Gagal hapus komentar:", err);
    }
  };


  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <div className="bg-white rounded-2xl shadow p-6">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-lg font-semibold">Post tidak ditemukan</div>
          <Link to="/socialfi" className="mt-3 inline-block px-4 py-2 rounded-xl border">
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 mt-16">
    <div className="w-full md:w-7/12 border-r">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/75 border-b">
        <div className="max-w-3xl mx-auto px-4 py-1 flex items-center gap-3">
          <Link to="/socialfi" className="flex px-3 py-1 items-center rounded-lg border">
            <IoIosArrowRoundBack className="w-5 h-5" /> Back to Feed
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-2">
        <PostDetail
          post={post}
          onLike={handleLike}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onDeleteComment={handleDeleteComment}
        />
      </main>
    </div>
      <aside className="hidden md:block w-5/12 p-4">
        <RecommendedUsers />
      </aside>
    </div>
  );
}
