import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

export default function Post({ post, onLike }) {
  return (
    <article className="bg-white rounded-2xl shadow shadow-yellow-100 border-2 border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.author?.avatar || "/images/default-avatar.png"}
          alt={post.author?.name || "Anon"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold leading-tight">
            {post.author?.name || "Anon"}
          </div>
          <div className="text-xs text-gray-500">
            {post.author?.handle || "@anon"} •{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-3 whitespace-pre-wrap text-sm">{post.content}</div>
      {post.image && (
        <div className="mt-3 overflow-hidden rounded-xl border">
          <img src={post.image} alt="post" className="w-full object-cover" />
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          <FaRegHeart /> {post.likes || 0}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
        <AiOutlineComment /> {post.commentsCount ?? (post.comments ? post.comments.length : 0)}
        </Link>

        <button className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg border hover:bg-gray-50">
          <FaShare /> Share
        </button>
      </div>
    </article>
  );
}
