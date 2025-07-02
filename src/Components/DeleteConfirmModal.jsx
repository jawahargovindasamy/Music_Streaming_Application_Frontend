import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ title, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center">
          <div className="mb-4">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Delete Playlist</h2>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete "{title}"? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
