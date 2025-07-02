import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import { PlayerContext } from "../Context/PlayerContext";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    dob: user.dob ? user.dob.slice(0, 10) : "",
    phone: user.phone || "",
    profilePic: user.profilePic || "",
    location: user.location || "",
    bio: user.bio || "",
  });

  const [imageFile, setImageFile] = useState(null);

  const { url } = useContext(PlayerContext);

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("dob", formData.dob);
      data.append("location", formData.location);
      if (user.role === "artist") {
        data.append("bio", formData.bio);
      }
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.put(
        `${url}/api/user/update/${user.userId}`,
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success(response.data.message || "Profile updated successfully!");
      login({ ...user, ...response.data.data });
      setIsEditable(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
      console.error(error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-[#121212] rounded-2xl shadow-xl p-8 space-y-6 border border-zinc-800">
          {/* Avatar and edit button */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : formData.profilePic || "/placeholder.svg"
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
              />
              {isEditable && (
                <>
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 bg-green-600 p-1 rounded-full cursor-pointer hover:bg-green-500"
                    title="Upload new profile pic"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m0 0L9 18H5v-4l9.768-9.768z"
                      />
                    </svg>
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <h2 className="text-2xl font-bold">Edit Your Profile</h2>
            <p className="text-zinc-400">Manage your account details</p>

            {user.role === "artist" && (
              <span className="text-sm text-purple-400 mt-2">
                Artist Account
              </span>
            )}

            <button
              onClick={() => setIsEditable(!isEditable)}
              className="mt-4 px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded hover:bg-zinc-700 transition"
            >
              {isEditable ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-zinc-300">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={!isEditable}
                className={`w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  isEditable ? "" : "opacity-50 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block mb-1 text-zinc-300">Email</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 opacity-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 text-zinc-300">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                disabled={!isEditable}
                className={`w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  isEditable ? "" : "opacity-50 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block mb-1 text-zinc-300">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                disabled={!isEditable}
                className={`w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                  isEditable ? "" : "opacity-50 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Bio field for Artist */}
            {user.role === "artist" && (
              <div>
                <label className="block mb-1 text-zinc-300">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  disabled={!isEditable}
                  className={`w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none ${
                    isEditable ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                ></textarea>
              </div>
            )}

            {isEditable && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
