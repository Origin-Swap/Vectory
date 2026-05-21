import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../../config/ApiUrl';
import { useAccount } from "wagmi";
import { FaImage, FaTrash } from "react-icons/fa";

export default function CreatePost({ onCreate }) {
  const { address } = useAccount();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [profile, setProfile] = useState(null);

  // Ambil data user dari backend
  useEffect(() => {
    if (!address) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/${address}`);
        if (res.status === 404) {
          console.log("User not found, using default profile");
          setProfile({
            avatar: "/images/default-avatar.png",
          });
          return;
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [address]);

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("address", address);
      formData.append("content", content);

      // max 4 file
      files.slice(0, 4).forEach((file) => formData.append("images", file));

      const res = await axios.post(`${API_URL}/api/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onCreate) onCreate(res.data);
      setContent("");
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.error("Gagal membuat post:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    createPost();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // gabungkan dengan file yang sudah ada
    let newFiles = [...files];
    let newPreviews = [...previews];

    for (let file of selectedFiles) {
      if (newFiles.length >= 4) {
        alert("Max 4 images per post.");
        break;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert(`Image ${file.name} more than 2mb, cannot upload.`);
        continue;
      }
      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setFiles(newFiles);
    setPreviews(newPreviews);
    e.target.value = ""; // reset input
  };

  const handleRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-2 bg-white rounded-xl shadow md:p-4 p-2"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={profile?.avatar || "/images/avatar-image.png"}
          alt="me"
          className="w-10 h-10 rounded-full bg-gray-200"
        />

        {/* Kotak teks + preview */}
        <div className="flex-1 flex flex-col gap-2">
        <textarea
          ref={(el) => {
            if (el) {
              el.style.height = "auto";
              el.style.height = `${el.scrollHeight}px`;
            }
          }}
          className="resize-none rounded-xl border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 overflow-hidden"
          placeholder="Promote your product today!"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />


          {/* Preview gambar multiple */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {previews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="h-32 w-full object-cover rounded-xl border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
          <label className="cursor-pointer text-gray-600 hover:text-gray-900 flex items-center gap-1 w-fit">
            <FaImage size={20} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="flex flex-col items-end">
            <button
              type="submit"
              className="px-4 py-1 rounded-xl text-sm bg-gray-900 text-white hover:opacity-90"
            >
              Post
            </button>
          </div>

          </div>
        </div>
      </div>
    </form>
  );
}
