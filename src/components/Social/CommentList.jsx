import React from "react";
import { Link } from "react-router-dom";

export default function CommentList({ comments, onAddReply, onDeleteComment }) {
  if (!comments || comments.length === 0) {
    return <div className="text-sm text-gray-500">Belum ada komentar</div>;
  }

  // 🚀 Urutkan paling baru dulu (descending createdAt)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="space-y-4">
      {sortedComments.map((c) => (
        <div key={c.id} className="border rounded-lg p-3">
          {/* Header user */}
          <Link to={`/profile/${c.author?.address}`} className="flex items-center gap-2">
            <img
              src={c.author?.avatar || "/images/default-avatar.png"}
              alt={c.author?.name || "Anon"}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium text-sm">
            {c.author?.name || "Anon"}
            {c.author?.level && (
              <img
                src={`/images/badge/${c.author?.level.toLowerCase()}.png`}
                alt={`${c.author?.level} badge`}
                className="ml-1 w-4 h-4 inline-block"
              />
            )}</span>
            <span className="text-xs text-gray-400 ml-auto">
              {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
            </span>
            </Link>

          {/* Isi komentar */}
          <div className="my-2 text-sm">{c.content || c.text}</div>

          {/* Actions */}
          <div className="mt-2 flex gap-3 text-xs text-gray-500">
            <button
              onClick={() => onAddReply(c.id, "Balasan...")}
              className="hover:underline"
            >
              Reply
            </button>
            <button
              onClick={() => onDeleteComment(c.id)}
              className="hover:underline text-red-500"
            >
              Delete
            </button>
          </div>

          {/* List reply */}
          {c.replies && c.replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {c.replies
                .slice() // clone array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // urutkan reply juga
                .map((r) => (
                  <div key={r.id} className="border rounded-lg p-2 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.User?.avatar || "/images/default-avatar.png"}
                        alt={r.User?.username || "Anon"}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="font-medium text-xs">
                        {r.User?.username || "Anon"}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                      </span>
                    </div>
                    <div className="mt-1 text-xs">{r.content}</div>
                    <div className="mt-1 text-[11px] text-gray-500 flex gap-2">
                      <button
                        onClick={() => onDeleteComment(r.id, c.id)}
                        className="hover:underline text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
