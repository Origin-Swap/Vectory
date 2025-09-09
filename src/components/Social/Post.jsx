import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShare } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { PiBookmarksLight } from "react-icons/pi";
import { useAccountSupra } from "../../context/account";

// ✅ helper waktu relatif
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

export default function Post({ post, onLike }) {
  const user = post.User || post.author || {};
  const { address } = useAccountSupra();

  const hasLiked = post.Likes
    ? post.Likes.some((like) => like.userAddress === address)
    : post.likedByMe || false;

  // 👉 state untuk slider
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
    <article className="bg-gray-50 rounded-xl shadow border border-gray-100 px-4 pt-4 pb-2">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to={`/profile/${user.address}`}>
          <img
            src={user.avatar || "/images/default-avatar.png"}
            alt={user.name || "Anon"}
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <div>
          <div className="font-semibold leading-tight items-center">
            <Link to={`/profile/${user.address}`}>
              {user.name || "Anon"}
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
            {`${user.address?.slice(0, 6)}...${user.address?.slice(-4)}` ||
              "@anon"}{" "}
            ~ {timeAgo(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Images */}
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

      <div className="mt-3 whitespace-pre-wrap text-sm border-b pb-2">
        {post.content}
      </div>

      {/* Actions */}
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 px-3 py-1 "
        >
          {hasLiked ? <FaHeart className="text-red-500" /> : <BiLike />}
          {post.likes || 0}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-2 px-3 py-1 "
        >
          <LiaComments />{" "}
          {post.commentsCount ?? (post.comments ? post.comments.length : 0)}
        </Link>

        <button className="flex items-center gap-2 px-3 py-1 ">
          <FaShare /> {post.likes || 0}
        </button>

        <button className="ml-auto flex items-center gap-2 px-3 py-1 ">
          <PiBookmarksLight />
        </button>
      </div>
    </article>
  );
}
