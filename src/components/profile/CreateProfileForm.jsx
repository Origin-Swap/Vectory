// 📁 src/components/profile/CreateProfileForm.jsx
import React from 'react';

const CreateProfileForm = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Your Profile</h2>
      <form className="flex flex-col space-y-4">
        <input type="text" placeholder="Username" className="border p-2 rounded" />
        <input type="text" placeholder="Bio" className="border p-2 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
