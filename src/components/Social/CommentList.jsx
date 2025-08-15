import React from "react";

export default function CommentList({ children }) {
  return (
    <div className="space-y-4">
      {React.Children.count(children) === 0 ? (
        <div className="text-sm text-gray-500">Belum ada komentar</div>
      ) : (
        children
      )}
    </div>
  );
}
