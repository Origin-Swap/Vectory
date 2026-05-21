import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShare } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { PiBookmarksLight } from "react-icons/pi";
import { LuBadgeCheck } from "react-icons/lu";
import { useAccount } from "wagmi";

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
    <article className="card-bg rounded-xl shadow-md border border-gray-200 px-4 pt-4 pb-2">
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
          <div className="font-bold text-black leading-tight items-center">
            <Link to={`/profile/${user.address}`} className="flex font-bold text-black">
              {user.name || "Anon"}
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

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <Link to={`/post/${post.id}`} className="relative">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="post"
              className="max-h-[400px] mt-3 bg-white dark:bg-gray-800 shadow-xl w-full object-contain rounded-xl border border-gray-300"
            />
          ) : (
            <div className="relative">
              <img
                src={post.images[currentIndex]}
                alt={`post-${currentIndex}`}
                className="max-h-[400px] w-full bg-white shadow-xl dark:bg-gray-800 object-contain rounded-xl border border-gray-300"
              />

              {/* indikator dot */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {post.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === currentIndex ? "bg-white scale-110" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

          )}
        </Link>
      )}

      <div className="mt-3 whitespace-pre-wrap text-sm border-b pb-2">
        {post.content && post.content.length > 160 ? (
          <>
            {post.content.slice(0, 160)}...
            <Link
              to={`/post/${post.id}`}
              className="text-blue-500 hover:underline ml-1"
            >
              Read more
            </Link>
          </>
        ) : (
          post.content
        )}
      </div>


      {/* Actions */}
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
        <button
          onClick={() => onLike(post.id)}
          className="flex bg-white/0 items-center gap-2 px-3 py-1 "
        >
          {hasLiked ? <FaHeart className="text-red-500" /> : <BiLike />}
          {post.likes || 0}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex bg-white/0 items-center gap-2 px-3 py-1 "
        >
          <LiaComments />{" "}
          {post.commentsCount ?? (post.comments ? post.comments.length : 0)}
        </Link>

        <button className="flex bg-white/0 items-center gap-2 px-3 py-1 ">
          <FaShare /> {post.likes || 0}
        </button>

        <button className="ml-auto flex items-center gap-2 px-3 py-1 ">
          <PiBookmarksLight />
        </button>
      </div>
    </article>
  );
}
