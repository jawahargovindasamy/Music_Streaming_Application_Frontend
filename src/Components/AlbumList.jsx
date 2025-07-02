import React from "react";
import AlbumListItem from "./AlbumListItem";

const AlbumList = ({
  albums,
  expandedAlbums,
  setExpandedAlbums,
  setEditingAlbum,
  setAlbumData,
  setAlbumClicked,
  setEditingSong,
  setSongData,
  setSongClicked,
  storedUser,
}) => {
  const toggleAlbum = (albumId) => {
    setExpandedAlbums((prev) => {
      const newSet = new Set(prev);
      newSet.has(albumId) ? newSet.delete(albumId) : newSet.add(albumId);
      return newSet;
    });
  };
  return (
    <div className="space-y-4 mt-4">
      {albums.map((album) => (
        <AlbumListItem
          key={album.id}
          album={album}
          isExpanded={expandedAlbums.has(album.id)}
          toggleAlbum={toggleAlbum}
          setEditingAlbum={setEditingAlbum}
          setAlbumData={setAlbumData}
          setAlbumClicked={setAlbumClicked}
          setEditingSong={setEditingSong}
          setSongData={setSongData}
          setSongClicked={setSongClicked}
          storedUser={storedUser}
        />
      ))}
    </div>
  );
};

export default AlbumList;
