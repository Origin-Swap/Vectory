import React from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function CommentList({ post, comments, onAddReply, onDeleteComment }) {
  if (!comments || comments.length === 0) {
    return <div className="text-sm text-gray-500">No Comments Found</div>;
  }

  // 🚀 Urutkan paling baru dulu (descending createdAt)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
            <div className="font-medium text-sm">
            {c.author?.name || "Anon"}
            {c.author?.level === "Silver" && (
              <LuBadgeCheck className="ml-1 w-4 h-4 text-white fill-blue-500" />
            )}
            {c.author?.level === "Gold" && (
              <LuBadgeCheck className="ml-1 w-4 h-4 text-white fill-yellow-400" />
            )}
            </div>
            <div className="text-xs text-gray-400 ml-auto">
              ~ {timeAgo(c.createdAt)}
            </div>
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
