import React, { useContext, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Display from "./Pages/Display";
import { PlayerContext } from "./Context/PlayerContext";
import { AuthContext } from "./Context/AuthContext";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";

const App = () => {
  const { audioRef, track, songsData, isSidebarOpen, setIsSidebarOpen } =
    useContext(PlayerContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const hideLayout =
    ["/login", "/register", "/forgot-password", "/404"].includes(
      location.pathname
    ) || location.pathname.startsWith("/reset-password");

  useEffect(() => {
    if (user?.token) {
      try {
        const { exp } = jwtDecode(user.token);
        const isExpired = Date.now() >= exp * 1000;

        if (isExpired) {
          logout();
        }
      } catch (error) {
        localStorage.removeItem("user");
        console.error("Error decoding token:", error.message);
        logout();
      }
    }
  }, [user]);

  return (
    <div className="h-screen bg-black relative">
      <ToastContainer position="bottom-right" />

      <>
        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />

          <Route
            path="/*"
            element={
              <div className="h-[80%] flex">
                <Sidebar
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
                <Display setIsSidebarOpen={setIsSidebarOpen} />
              </div>
            }
          />

          <Route path="/404" element={<NotFound />} />
        </Routes>

        {/* Player */}
        {!hideLayout && <Player />}
      </>

      {track?.audio && (
        <audio
          ref={audioRef}
          src={track.audio}
          preload="auto"
          className="hidden"
        />
      )}
    </div>
  );
};

export default App;
