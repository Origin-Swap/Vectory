// File: src/components/Social/RecommendedUsers.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from '../../config/ApiUrl';
import { FaArrowRight } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";
import axios from "axios";

const RecommendedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/recommended?limit=5`);
        setUsers(res.data); // ✅ langsung array
      } catch (err) {
        console.error("Gagal ambil user:", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);


  return (
    <div className="sticky top-20 py-4 ">
      <h3 className="text-lg font-semibold mb-3">👥 Suggested follows</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex items-center bg-white border rounded-xl p-2 justify-between">
            <div className="flex items-center gap-1">
              <img
                src={user.avatar || "/images/avatar-image.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="flex items-center text-sm font-medium">
              {user.username || "Anon"}
              {user.level === "Silver" && (
                <LuBadgeCheck className="w-5 h-5 text-white fill-blue-500" />
              )}
              {user.level === "Gold" && (
                <LuBadgeCheck className="w-5 h-5 text-white fill-yellow-400" />
              )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/profile/${user.address}`}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <FaArrowRight className="text-gray-600 text-xs" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedUsers;
