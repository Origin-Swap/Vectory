// PostDetail.jsx
import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAccountSupra } from "../../context/account";

export default function PostDetail({
  post,
  onLike,
  onAddComment,
  onAddReply,
  onDeleteComment,
}) {
  const { address, isConnected } = useAccountSupra();
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
          <div className="font-semibold leading-tight">
           <Link to={`/profile/${post.author?.address}`}>
            {user.username || user.name || "Anon"}
            {user.level && (
              <img
                src={`/images/badge/${user.level.toLowerCase()}.png`}
                alt={`${user.level} badge`}
                className="ml-1 w-5 h-5 inline-block"
              />
            )}
            </Link>
          </div>
          <div className="text-xs text-gray-500">
            {(user.handle || user.address || "").slice(0, 6)}... •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-3 whitespace-pre-wrap text-sm">{post.content}</div>
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

      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <button
          onClick={onLike}
          className="flex items-center gap-x-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          <FaRegHeart /> {post.likes}
        </button>
        <span className="flex items-center gap-x-2 text-gray-500">
          <AiOutlineComment />{post.commentsCount ?? post.comments?.length ?? 0}
        </span>
        <button className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50">
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
