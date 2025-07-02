import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import { PlayerContext } from "../Context/PlayerContext";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [roleUpdates, setRoleUpdates] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const { url } = useContext(PlayerContext);

  console.log(users);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const res = await axios.get(`${url}/api/user/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const onlyUsers = res.data.data.filter((u) => u.role === "user");
      setUsers(onlyUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  const handleRoleChange = (userId, newRole) => {
    setRoleUpdates((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdate = async (userId) => {
    const newRole = roleUpdates[userId];
    if (!newRole) return toast.info("Please select a role");

    try {
      setUpdating((prev) => ({ ...prev, [userId]: true }));
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await axios.put(
        `http://localhost:5000/api/user/update/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Role updated successfully");

      setRoleUpdates((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });

      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
      console.error(error);
    } finally {
      setUpdating((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#121212] text-white min-h-screen p-6">
        <ToastContainer position="top-right" autoClose={3000} />

        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Manage Artists
        </h2>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-[#1e1e1e] text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-400">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 shadow-md flex flex-col items-center text-center transition hover:border-purple-500"
              >
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-purple-500"
                />
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-sm text-gray-400 mb-2">{user.email}</p>

                <select
                  value={roleUpdates[user._id] || user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="bg-[#2c2c2c] border border-gray-700 rounded px-3 py-1 mb-3 text-white focus:ring-2 focus:ring-purple-500 cursor-pointer w-full text-center"
                >
                  <option value="user">User</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    disabled={updating[user._id]}
                    className={`flex-1 px-4 py-1 text-sm rounded text-white ${
                      updating[user._id]
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                  >
                    {updating[user._id] ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      "Update"
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex-1 px-4 py-1 text-sm rounded bg-red-600 hover:bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUser;
