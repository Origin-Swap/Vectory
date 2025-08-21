// PostDetail.jsx
import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

export default function PostDetail({
  post,
  onLike,
  onAddComment,
  onAddReply,
  onDeleteComment,
}) {
  // 🚀 Normalisasi user
  const user = post.User || post.author || {};

  return (
    <article className="bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatar || "/images/default-avatar.png"}
          alt={user.username || user.name || "Anon"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold leading-tight">
            {user.username || user.name || "Anon"}
          </div>
          <div className="text-xs text-gray-500">
            {(user.handle || user.address || "").slice(0, 6)}... •{" "}
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
      <CommentForm onSubmit={onAddComment} />

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
