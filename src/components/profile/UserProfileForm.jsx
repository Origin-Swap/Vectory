import React, { useState, useRef } from "react";
import { API_URL } from '../../config/ApiUrl';

const UserProfileForm = ({ initialData, onSave, address }) => {
  const [avatar, setAvatar] = useState(initialData?.avatar || "/images/default-avatar.png");
  const [avatarFile, setAvatarFile] = useState(null); // Simpan file asli
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const fileInputRef = useRef(null);

  // Preview image + simpan file asli
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file)); // preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("address", address); // ganti dengan address wallet user
      formData.append("username", username);
      formData.append("email", email);
      formData.append("bio", bio);
      if (avatarFile) {
        formData.append("avatar", avatarFile); // file asli
      }

      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Response is not JSON");
      }


      if (res.ok) {
        onSave(data.data);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {initialData ? "Edit Profile" : "Create Profile"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar Upload & Preview */}
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt="Avatar Preview"
            className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-md"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
          >
            Change Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell something about yourself..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
