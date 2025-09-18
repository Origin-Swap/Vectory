// File: src/components/Social/RecommendedUsers.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/ApiUrl";
import axios from "axios";

const RecommendedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/recommended?limit=20`); // ✅ ambil 20 user
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gagal ambil user:", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="md:hidden block sticky top-14 pt-2 pb-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex-shrink-0 flex flex-col items-center bg-white p-2 rounded-xl"
          >
            <Link
              to={`/profile/${user.address}`}
              className="flex flex-col items-center text-center"
            >
              <img
                src={user.avatar || "/images/avatar-image.png"}
                alt={user.username}
                className="w-16 h-16 border p-1 border-yellow-400 bg-gray-200 rounded-xl"
              />
              <span className="text-sm text-black font-medium mt-1 line-clamp-1">
                {user.username || "Anon"}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedUsers;
