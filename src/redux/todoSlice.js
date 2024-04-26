import { createSlice } from "@reduxjs/toolkit";

// Define a Redux slice for managing todo list state
const todoSlice = createSlice({
  // Slice name
  name: "todoList",
  // Initial state
  initialState: {
    todos: [], // Array to store todo items
  },
  // Reducer functions to handle state updates
  reducers: {
    // Reducer function to set todo list from Firestore
    setTodo: (state, action) => {
      state.todos = action.payload; // Update todos array with payload from Firestore
    },
    // Reducer function to add a new todo item
    addTodo: (state, action) => {
      state.todos.push(action.payload); // Add new todo item to todos array
    },
    // Reducer function to update an existing todo item
    updateTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        // Update todo item with new data
        state.todos[index] = { ...state.todos[index], ...updatedTodo };
      }
    },
    // Reducer function to delete a todo item
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      // Remove todo item with matching ID from todos array
      state.todos = state.todos.filter((todo) => todo.id !== idToDelete);
    },
  },
});

// Export action creators and reducer from todoSlice
export const { setTodo, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
