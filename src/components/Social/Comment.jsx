import React from "react";

export default function Comment({ author, text }) {
  return (
    <div className="flex gap-3">
      <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="text-sm"><span className="font-medium">{author.name}</span></div>
        <div className="text-sm text-gray-700">{text}</div>
        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
          <button className="px-2 py-1 rounded-lg hover:bg-gray-50">Like</button>
          <button className="px-2 py-1 rounded-lg hover:bg-gray-50">Reply</button>
          <button
            onClick={() => onDeleteComment(comment.id)}
            className="text-red-500 text-xs ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
