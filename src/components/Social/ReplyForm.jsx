import React, { useState } from "react";

export default function ReplyForm({ onAddReply }) {
  const [text, setText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddReply(text);
    setText("");
    setShowForm(false);
  };

  return (
    <div className="mt-2">
      {showForm ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded-lg px-2 py-1 text-sm"
            placeholder="Write a reply..."
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg"
          >
            Reply
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-xs text-gray-500 hover:underline"
        >
          Reply
        </button>
      )}
    </div>
  );
}
