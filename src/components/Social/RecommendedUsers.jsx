// File: src/components/Social/RecommendedUsers.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from '../../config/ApiUrl';
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const RecommendedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://towerpad.online/api/user/recommended?limit=5");
        setUsers(res.data); // ✅ langsung array
      } catch (err) {
        console.error("Gagal ambil user:", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);


  return (
    <div className="sticky top-20 bg-gray-50 border rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-3">👥 Recommended Users</h3>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || "/images/avatar/Av11.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{user.username || "Anon"}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg">
                Follow
              </button>
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
