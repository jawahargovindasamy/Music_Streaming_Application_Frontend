import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FaUsers, FaPlayCircle, FaHeadphones } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { PlayerContext } from "../Context/PlayerContext";

const Admin = () => {
  const [isPositive, setIsPositive] = useState({
    userGrowth: true,
    streamGrowth: true,
    artistGrowth: true,
  });
  const [data, setData] = useState(null);

  const { url } = useContext(PlayerContext);

  // Simulate fetching data from an API
  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      console.log("Fetching data with token:", token);

      const response = await axios.get(
        `${url}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setIsPositive({
        userGrowth: response.data.userGrowth > 0,
        streamGrowth: response.data.streamGrowth > 0,
        artistGrowth: response.data.artistGrowth > 0,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-black mt-2">
        <div className="flex flex-wrap justify-center items-center gap-4 p-6">
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Total Users</h2>
              <FaUsers />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.totalUsers}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive.userGrowth ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive.userGrowth ? "+" : "-"}
              {Math.abs(data?.userGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Monthly Streams</h2>
              <FaPlayCircle />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.currentMonthStreams}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : "-"}
              {Math.abs(data?.streamGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Active Artists</h2>
              <FaHeadphones />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.activeArtists}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : "-"}
              {Math.abs(data?.artistGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto mt-6">
        <h2 className="text-lg font-semibold text-black">
          Top Tracks This Week
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Most played tracks in the last 7 days
        </p>

        <ol className="space-y-3">
          {data?.topTracks?.map((track, index) => (
            <li
              key={track.song._id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold text-gray-700">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-black">{track.song.name}</p>
                  <p className="text-sm text-gray-500">
                    {track.song.artistID || "Unknown Artist"}
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {track.count}M
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Admin;
