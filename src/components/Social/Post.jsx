import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShare } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { useAccountSupra } from "../../context/account"; // 👈 ambil user login

export default function Post({ post, onLike }) {
  const user = post.User || post.author || {};
  const { address } = useAccountSupra(); // 👈 current logged-in user

  // Cek apakah saya sudah like
  const hasLiked = post.Likes
    ? post.Likes.some((like) => like.userAddress === address) // kalau post.Likes ada
    : post.likedByMe || false; // fallback kalau backend sudah kasih flag

  return (
    <article className="bg-white rounded-2xl shadow shadow-yellow-100 border-2 border-gray-200 p-4">
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
            {user.handle || "@anon"} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-3 whitespace-pre-wrap text-sm">{post.content}</div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={`mt-3 grid gap-2 ${
            post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl border">
              <img
                src={img}
                alt={`post-${i}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          {hasLiked ? (
            <FaHeart className="text-red-500" /> // ❤️ sudah like
          ) : (
            <FaRegHeart /> // 🤍 belum like
          )}
          {post.likes || 0}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          <AiOutlineComment />{" "}
          {post.commentsCount ?? (post.comments ? post.comments.length : 0)}
        </Link>

        <button className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50">
          <FaShare /> Share
        </button>
      </div>
    </article>
  );
}
