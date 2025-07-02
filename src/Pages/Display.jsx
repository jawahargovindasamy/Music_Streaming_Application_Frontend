import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Admin from "./Admin";
import AdminUser from "./AdminUser";
import Artist from "./Artist";
import ArtistAlbum from "./ArtistAlbum";
import Profile from "./Profile";
import DisplayAlbum from "./DisplayAlbum";
import DisplayArtist from "./DisplayArtist";
import AlbumsPage from "./AlbumsPage";
import SongsPage from "./SongsPage";
import ArtistPage from "./ArtistPage";
import RecentPage from "./RecentPage";
import PlaylistManager from "./PlaylistManager";
import LikePage from "./LikePage";
import LikeAlbumPage from "./LikeAlbumPage";
import FollowArtistPage from "./FollowArtistPage";
import SearchPage from "./SearchPage";
import ReccomendPage from "./ReccomendPage";

const Display = () => {
  return (
    <div className="w-full m-2 px-2 rounded text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/user" element={<AdminUser />} />

        <Route path="/artist/dashboard" element={<Artist />} />
        <Route path="/artist/albums" element={<ArtistAlbum />} />

        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/artist/:id" element={<DisplayArtist />} />

        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/songs" element={<SongsPage />} />

        <Route path="/recently-played" element={<RecentPage />} />
        <Route path="/playlist/:id" element={<PlaylistManager />} />
        <Route path="/liked-songs" element={<LikePage />} />
        <Route path="/liked-album" element={<LikeAlbumPage />} />
        <Route path="/followed-artist" element={<FollowArtistPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/recommended" element={<ReccomendPage />} />

        <Route path="*" element={<Navigate to="/404" replace />}/>
      </Routes>
    </div>
  );
};

export default Display;
