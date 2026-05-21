// PostDetail.jsx
import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

export default function PostDetail({
  post,
  onLike,
  onAddComment,
  onAddReply,
  onDeleteComment,
}) {
  const { address, isConnected } = useAccount();
  // 🚀 Normalisasi user
  const user = post.User || post.author || {};
    const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
    return `${Math.floor(diff / 31536000)}y ago`;
  }

  return (
    <article className="bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
       <Link to={`/profile/${post.author?.address}`}>
        <img
          src={user.avatar || "/images/default-avatar.png"}
          alt={user.username || user.name || "Anon"}
          className="w-10 h-10 rounded-full"
        />
        </Link>
        <div>
          <div className="flex items-center font-semibold leading-tight">
           <Link to={`/profile/${post.author?.address}`} className="flex items-center text-black font-bold">
            {user.username || user.name || "Anon"}
            {user.level === "Silver" && (
              <LuBadgeCheck className="w-6 h-6 text-white fill-blue-500" />
            )}
            {user.level === "Gold" && (
              <LuBadgeCheck className="w-6 h-6 text-white fill-yellow-400" />
            )}
            </Link>
          </div>
          <div className="text-xs text-gray-500">
          {`${user.address?.slice(0, 6)}...${user.address?.slice(-4)}` ||
            "@anon"}{" "}
          ~ {timeAgo(post.createdAt)}
          </div>
        </div>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="mt-3 relative">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="post"
              className="max-h-[400px] w-full object-contain rounded-xl border border-gray-300"
            />
          ) : (
            <div className="relative">
              <img
                src={post.images[currentIndex]}
                alt={`post-${currentIndex}`}
                className="max-h-[400px] w-full object-contain rounded-xl border border-gray-300"
              />

              {/* Tombol prev */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                ‹
              </button>

              {/* Tombol next */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                ›
              </button>

              {/* indikator dot */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {post.images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Body */}
      <div className="mt-3 whitespace-pre-wrap text-sm">{post.content}</div>


      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <button
          onClick={onLike}
          className="flex items-center bg-white/0 gap-x-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          <FaRegHeart /> {post.likes}
        </button>
        <span className="flex  bg-white/0 items-center gap-x-2 text-gray-500">
          <AiOutlineComment />{post.commentsCount ?? post.comments?.length ?? 0}
        </span>
        <button className="ml-auto  bg-white/0 flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50">
          <FaShare /> Share
        </button>
      </div>

      {/* Comment composer */}
      {isConnected && ( <CommentForm onSubmit={onAddComment} /> )}

      {/* Comment list */}
      <div className="mt-4">
        <CommentList
          comments={post.comments || []}
          onAddReply={onAddReply}
          onDeleteComment={onDeleteComment}
        />
      </div>
    </article>
  );
}
