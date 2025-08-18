import React from "react";

export default function CommentList({ comments, onAddReply, onDeleteComment }) {
  if (!comments || comments.length === 0) {
    return <div className="text-sm text-gray-500">Belum ada komentar</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="border rounded-lg p-3">
          {/* Header user */}
          <div className="flex items-center gap-2">
            <img
              src={c.User?.avatar || "/images/default-avatar.png"}
              alt={c.User?.username || "Anon"}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium text-sm">{c.User?.username || "Anon"}</span>
          </div>

          {/* Isi komentar */}
          <div className="mt-1 text-sm">{c.content}</div>

          {/* Actions */}
          <div className="mt-2 flex gap-3 text-xs text-gray-500">
            <button
              onClick={() => onAddReply(c.id, "Balasan...")} // nanti bisa bikin input reply
              className="hover:underline"
            >
              Balas
            </button>
            <button
              onClick={() => onDeleteComment(c.id)}
              className="hover:underline text-red-500"
            >
              Hapus
            </button>
          </div>

          {/* List reply */}
          {c.replies && c.replies.length > 0 && (
            <div className="ml-6 mt-2 space-y-2">
              {c.replies.map((r) => (
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
                  </div>
                  <div className="mt-1 text-xs">{r.content}</div>
                  <div className="mt-1 text-[11px] text-gray-500 flex gap-2">
                    <button
                      onClick={() => onDeleteComment(r.id, c.id)}
                      className="hover:underline text-red-500"
                    >
                      Hapus
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
