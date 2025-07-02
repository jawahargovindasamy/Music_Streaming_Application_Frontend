import React, { useEffect, useState } from "react";

const EditPlaylistModal = ({
  title,
  setTitle,
  newCoverImage,
  setNewCoverImage,
  onSave,
  onCancel,
  currentImage,
}) => {
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    if (newCoverImage) {
      const url = URL.createObjectURL(newCoverImage);
      setPreviewURL(url);

      return () => URL.revokeObjectURL(url); // cleanup
    } else {
      setPreviewURL(null);
    }
  }, [newCoverImage]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Playlist</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Playlist Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter playlist title"
            />
          </div>

          {/* Image Preview */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Cover Image
            </label>
            {previewURL || currentImage ? (
              <img
                src={previewURL || currentImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-3 border border-white/20"
              />
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCoverImage(e.target.files[0])}
              className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onSave}
              className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-lg text-black font-semibold transition"
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
