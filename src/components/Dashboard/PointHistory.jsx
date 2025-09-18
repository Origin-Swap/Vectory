// src/components/Dashboard/PointHistory.jsx
import React from "react";

const PointHistory = ({ pointHistory }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Point History</h2>
      {pointHistory.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">Kegiatan</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Jumlah Poin</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Tanggal</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {pointHistory
              .slice(-10) // ambil 10 terakhir
              .reverse() // terbaru di atas
              .map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">Daily Check-in</td>
                  <td className="px-6 py-4">{item.points}</td>
                  <td className="px-6 py-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Belum ada riwayat poin.</p>
      )}
    </div>
  );
};

export default PointHistory;
