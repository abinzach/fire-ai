import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/todoSlice";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { FiCheck, FiEdit3, FiRepeat, FiTrash } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import DeleteModal from "./DeleteModal";
import { AnimatePresence, motion } from "framer-motion";

const TodoCard = ({ todo }) => {
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal visibility
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal visibility
  const dispatch = useDispatch(); // Redux dispatch function
  const { user } = UserAuth(); // User authentication context

  // Function to mark a task as complete
  const handleMarkAsComplete = async () => {
    // Update status in Redux store
    const updatedTodo = { ...todo, status: "completed" };
    dispatch(updateTodo({ id: todo.id, updatedTodo }));

    // Update status in Firestore
    const todoRef = doc(db, user.email, todo.id);
    try {
      await updateDoc(todoRef, { status: "completed" });
      toast.success("Task Completed");
    } catch (error) {
      console.error("Error marking todo as complete in Firestore:", error);
    }
  };

  // Function to mark a task as pending
  const handleMarkAsPending = async () => {
    // Update status in Redux store
    const updatedTodo = { ...todo, status: "pending" };
    dispatch(updateTodo({ id: todo.id, updatedTodo }));

    // Update status in Firestore
    const todoRef = doc(db, user.email, todo.id);
    try {
      await updateDoc(todoRef, { status: "pending" });
      toast.info("Task marked as Pending");
    } catch (error) {
      console.error("Error marking todo as pending in Firestore:", error);
    }
  };

  // Function to handle editing a task
  const handleEditTodo = (updatedTodo) => {
    const todoRef = doc(db, user.email, todo.id);
    updateDoc(todoRef, updatedTodo)
      .then(() => {
        dispatch(updateTodo({ id: updatedTodo.id, updatedTodo }));
        toast.success("Todo updated successfully");
      })
      .catch((error) => {
        console.error("Error updating todo in Firestore:", error);
      });
  };

  // Function to handle click on edit button
  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  // Function to handle click on delete button
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  // Function to handle task deletion
  const handleDelete = async () => {
    // Delete todo from Redux store
    dispatch(deleteTodo(todo.id));

    // Delete todo from Firestore
    const todoRef = doc(db, user.email, todo.id);
    try {
      await deleteDoc(todoRef);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting todo from Firestore:", error);
    }

    setDeleteModalOpen(false); // Close delete modal after deletion
  };

  // Function to handle canceling task deletion
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      {/* AnimatePresence component for animation */}
      <AnimatePresence>
        {/* Todo card with animations */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="hover:shadow-none shadow-lg transition-all duration-300 max-w-xs rounded-lg border-dashed border border-gray-400 p-5"
        >
          {/* Task title and action buttons */}
          <div className="w-full flex justify-between">
            <p className="font-semibold text-gray-700 text-lg">{todo.title}</p>
            <div className="flex">
              {/* Edit button */}
              <button
                onClick={handleEditClick}
                className="w-10 h-10 p-3 transition-all duration-300 hover:text-blue-500 rounded-full hover:bg-gray-100 text-center"
              >
                <FiEdit3 />
              </button>
              {/* Delete button */}
              <button
                onClick={handleDeleteClick}
                className="w-10 h-10 p-3 ml-2 transition-all duration-300 hover:text-red-500 rounded-full hover:bg-gray-100 text-center"
              >
                <FiTrash />
              </button>
            </div>
          </div>
          {/* Task description */}
          <p className="font-light text-gray-700 text-sm">{todo.description}</p>
          <div className="w-full flex justify-end">
            {/* Button to mark task as complete/pending */}
            {todo.status === "pending" ? (
              <button
                onClick={handleMarkAsComplete}
                className="bg-blue-500 mt-4 flex gap-2 items-center  rounded-lg text-xs text-white px-4 p-2 hover:bg-blue-600 transition-all duration-300"
              >
                <FiCheck /> <span>Mark as complete</span>
              </button>
            ) : (
              <button
                onClick={handleMarkAsPending}
                className="bg-gray-800 mt-4 flex gap-2 items-center rounded-lg text-xs text-white px-4 p-2 hover:bg-gray-900 transition-all duration-300"
              >
                <FiRepeat /> <span>Mark as pending</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Edit task modal */}
        {editModalOpen && (
          <EditTaskModal
            todo={todo}
            onSave={handleEditTodo}
            onClose={() => setEditModalOpen(false)}
          />
        )}

        {/* Delete task modal */}
        {deleteModalOpen && (
          <DeleteModal onDelete={handleDelete} onCancel={handleCancelDelete} />
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoCard;
