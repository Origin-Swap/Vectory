// src/components/Dashboard/Leaderboard.jsx
import React from "react";

const Leaderboard = ({ leaderboard, address }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Leaderboard</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Points</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {leaderboard.slice(0, 10).map((user) => {
            const displayName =
              user.username && user.username.trim() !== ""
                ? user.username
                : user.address
                ? `${user.address.slice(0, 4)}...${user.address.slice(-4)}`
                : "Anon";

            return (
              <tr
                key={user.rank}
                className={user.isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              >
                <td className="px-6 py-4">#{user.rank}</td>
                <td className="px-6 py-4 my-text flex items-center">
                  {displayName}
                </td>
                <td className="px-6 py-4">
                  {(user.points || 0).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
