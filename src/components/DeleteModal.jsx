import React from "react";

const DeleteModal = ({ onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg w-[48rem] max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-500">Delete Task</h2>
        <p className="my-5 text-gray-700 font-light">Do you want to delete this task?</p>
        <div className="flex mt-6 w-full justify-end">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="ml-2 border border-gray-500 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
