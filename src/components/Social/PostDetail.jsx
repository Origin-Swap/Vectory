// File: src/components/PostDetail.jsx
import React, { useState } from "react";
import CommentList from "./CommentList";
import Comment from "./Comment";

export default function PostDetail({ post, onLike, onAddComment }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <article className="bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-semibold leading-tight">{post.author.name}</div>
          <div className="text-xs text-gray-500">{post.author.handle} • {new Date(post.createdAt).toLocaleString()}</div>
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
        <button onClick={onLike} className="px-3 py-1 rounded-lg border hover:bg-gray-50">❤ {post.likes}</button>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500">{post.comments.length} Komentar</span>
      </div>

      {/* Comment composer */}
      <form onSubmit={submit} className="mt-4">
        <div className="flex gap-3">
          <img src="https://i.pravatar.cc/100?img=15" alt="me" className="w-8 h-8 rounded-full" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis komentar…"
            className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm">Kirim</button>
        </div>
      </form>

      {/* Comment list */}
      <div className="mt-4">
        <CommentList>
          {post.comments.map((c) => (
            <Comment key={c.id} author={c.author} text={c.text} />
          ))}
        </CommentList>
      </div>
    </article>
  );
}
