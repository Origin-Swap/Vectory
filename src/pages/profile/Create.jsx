import React, { useState } from "react";
import UserProfileForm from "../../components/profile/UserProfileForm";
import UserInfo from "../../components/profile/UserInfo";

const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    avatar: "/images/avatar2.png",
    username: "UserName",
    email: "user@example.com",
    bio: "Digital creator & blockchain enthusiast."
  });

  const handleSave = (updatedData) => {
    setProfile(updatedData);
    alert("Profile updated successfully!");
    // TODO: Kirim ke API backend untuk disimpan
  };

  return (
    <div className="mt-36 px-4">
      <UserInfo profile={profile} />
      <UserProfileForm initialData={profile} onSave={handleSave} />
    </div>
  );
};

export default EditProfilePage;
