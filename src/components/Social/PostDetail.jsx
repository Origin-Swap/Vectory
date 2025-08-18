import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function PostDetail({
  post,
  onLike,
  onAddComment,
  onAddReply,
  onDeleteComment, // 🚀 tambahkan kalau mau bisa delete juga
}) {
  return (
    <article className="bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.User?.avatar}
          alt={post.User?.username}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold leading-tight">{post.User?.username}</div>
          <div className="text-xs text-gray-500">
            {post.User?.address?.slice(0, 6)}... •{" "}
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
          className="px-3 py-1 rounded-lg border hover:bg-gray-50"
        >
          ❤ {post.likes}
        </button>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">
          {post.commentsCount ?? post.comments?.length ?? 0} Comments
        </span>
      </div>

      {/* Comment composer */}
      <CommentForm onSubmit={onAddComment} /> {/* ✅ ganti prop */}

      {/* Comment list */}
      <div className="mt-4">
        <CommentList
          comments={post.comments || []}
          onAddReply={onAddReply}
          onDeleteComment={onDeleteComment} // 🚀 lempar juga ke list
        />
      </div>
    </article>
  );
}
