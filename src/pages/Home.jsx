import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiPlus } from "react-icons/fi";
import AddTaskModal from "../components/AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "../redux/todoSlice";
import TodoCard from "../components/TodoCard";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { toast } from "sonner";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

const Home = () => {
  // State for add task modal
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // Get current user from context
  const { user } = UserAuth();
  // Get todos from Redux store
  const todos = useSelector((store) => store.todoList.todos);
  const dispatch = useDispatch();

  // Fetch todos from Firestore
  const fetchTodosFromFirestore = async () => {
    try {
      // Check if user is authenticated
      if (!user || !user.email) {
        console.error("User email is empty or undefined");
        return;
      }

      // Query Firestore for todos
      const querySnapshot = await getDocs(collection(db, user.email));
      const fetchedTodos = [];
      // Iterate through query snapshot and push todos to array
      querySnapshot.forEach((doc) => {
        fetchedTodos.push({ id: doc.id, ...doc.data() });
      });
      // Dispatch fetched todos to Redux store
      dispatch(setTodo(fetchedTodos));
    } catch (error) {
      console.error("Error fetching todos from Firestore: ", error);
    }
  };

  useEffect(() => {
    // Fetch todos when user or dispatch changes
    fetchTodosFromFirestore();
    console.log("todos", todos);
  }, [user, dispatch]);

  // Open or close add task modal
  const handleAddTaskModalOpen = () => {
    setAddTaskModalOpen(!addTaskModalOpen);
  };

  // Add todo to Firestore
  const addTodoToFirestore = async (todo) => {
    const todoRef = doc(db, user.email, todo.id);
    await setDoc(todoRef, todo);
    return {
      todo,
    };
  };

  // Add todo handler
  const handleAddTodo = (todo) => {
    addTodoToFirestore(todo);
    // Dispatch action to add todo to Redux store
    dispatch(addTodo(todo));
    // Show success toast
    toast.success("Todo added successfully");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter todos based on search query
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate pending and completed tasks
  const pendingTasks = filteredTodos.filter(
    (todo) => todo.status === "pending"
  );
  const completedTasks = filteredTodos.filter(
    (todo) => todo.status === "completed"
  );

  // Notification for pending tasks
  useEffect(() => {
    const intervalId = setInterval(() => {
      const pendingTodos = filteredTodos.filter(
        (todo) => todo.status === "pending"
      );
      if (pendingTodos.length > 0) {
        toast.info(`You have ${pendingTodos.length} pending todos.`);
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [filteredTodos]);

  if (user.email === null || user.email === undefined)
    return (
      <div className="w-full h-screen grid place-content-center text-9xl text-gray-100 bg-white animate-pulse">
        Loading
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="p-5 w-full flex gap-2 justify-between">
        {/* Search bar component */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        {/* Button to open add task modal */}
        <button
          onClick={handleAddTaskModalOpen}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 flex items-center gap-1  lg:text-sm text-white px-4 p-2 rounded-lg"
        >
          {" "}
          <FiPlus /> <span className="hidden lg:block">Add a task </span>
        </button>
      </div>
      {/* Display pending tasks */}
      {pendingTasks.length > 0 && (
        <motion.div layout className="p-5">
          <motion.h2 className="text-2xl p-5 font-semibold text-gray-500">
            Pending Tasks
          </motion.h2>
          <motion.div layout className="grid gap-6 lg:grid-cols-4">
            {/* Map through pending tasks and display TodoCard component */}
            {pendingTasks.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </motion.div>
        </motion.div>
      )}
      {/* Display completed tasks */}
      {completedTasks.length > 0 && (
        <motion.div layout className="p-5">
          <motion.h2 className="text-2xl p-5 font-semibold text-gray-500">
            Completed Tasks
          </motion.h2>
          <motion.div layout className="grid gap-6 lg:grid-cols-4">
            {/* Map through completed tasks and display TodoCard component */}
            {completedTasks.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </motion.div>
        </motion.div>
      )}
      {/* If there are no tasks, display a message */}
      {!pendingTasks.length && !completedTasks.length && (
        <div className="p-5 py-20 h-full w-full grid place-content-center">
          <p className="text-gray-100 text-8xl font-semibold">
            No tasks added.
          </p>
        </div>
      )}
      {/* Add task modal */}
      {addTaskModalOpen && (
        <AddTaskModal
          onSave={handleAddTodo}
          onClose={() => setAddTaskModalOpen(false)}
        />
      )}
    </>
  );
};

export default Home;
