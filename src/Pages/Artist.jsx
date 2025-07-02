import React, { useContext, useEffect, useState } from "react";
import { FaUsers, FaHeart, FaHeadphones } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { PlayerContext } from "../Context/PlayerContext";

const Artist = () => {
  const [isPositive, setIsPositive] = useState({
    streamGrowth: true,
    listenerGrowth: true,
    followerGrowth: true, 
  });
  const [data, setData] = useState(null);
  const {url} = useContext(PlayerContext);

  const fetchData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${url}/api/artist/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
      setIsPositive({
        streamGrowth: response.data.streamGrowth > 0,
        listenerGrowth: response.data.listenerGrowth > 0,
        followerGrowth: response.data.followerGrowth > 0,
      });

    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch data");
    }
  }

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
              <h2 className="text-gray-700 font-semibold">Total Streams</h2>
              <FaHeadphones />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.totalStreams}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive.streamGrowth ? "text-green-500" : isPositive.streamGrowth ? "text-red-500" : ""
              }`}
            >
              {isPositive.streamGrowth ? "+" : isPositive.streamGrowth ? "-" : ""}
              {Math.abs(data?.streamGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Monthly Listeners</h2>
              <FaUsers />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.monthlyListeners}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive.listenerGrowth ? "text-green-500" : isPositive.listenerGrowth ? "text-red-500" : ""
              }`}
            >
              {isPositive.listenerGrowth ? "+" : isPositive.listenerGrowth? "-" : ""}
              {Math.abs(data?.listenerGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold"> Followers</h2>
              <FaHeart />
            </div>
            <div className="text-3xl font-bold text-black">
              {data?.totalFollowers}
            </div>
            <div
              className={`mt-1 text-sm ${
                isPositive.followerGrowth>0 ? "text-green-500" : isPositive.followerGrowth<0 ? "text-red-500" : ""
              }`}
            >
              {isPositive.followerGrowth>0 ? "+" : isPositive.followerGrowth<0 ? "-" : ""}
              {Math.abs(data?.followerGrowth)}%{" "}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
