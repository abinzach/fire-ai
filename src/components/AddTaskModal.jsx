import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from "framer-motion";

// AddTaskModal component for adding new tasks
const AddTaskModal = ({ onClose, onSave }) => {
  // Define initial form values
  const initialValues = {
    title: '',
    description: '',
    status: 'pending'
  };

  // Function to handle form submission
  const onSubmit = (values, { resetForm }) => {
    // Generate unique ID for the new task
    const id = uuidv4();
    // Create new task object with generated ID and form values
    const newTask = {
      id,
      ...values
    };
    // Call onSave function with the new task object
    onSave(newTask);
    // Reset form fields
    resetForm();
    // Close the modal
    onClose();
  };

  // Function to validate form fields
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }
    return errors;
  };

  return (
    // Modal backdrop and container
    <AnimatePresence>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <motion.div 
         initial={{scale:0}}
         animate={{scale:1}}
         exit={{scale:0}}
         className="bg-white p-8 rounded-lg w-[48rem] max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        {/* Formik form */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {/* Form component */}
          <Form>
            {/* Title field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                className="mt-1 p-2 block w-full outline-1 bg-gray-100 rounded-md  shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {/* Error message for title field */}
              <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            {/* Description field */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows="3"
                className="mt-1 p-2 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {/* Buttons for Save and Cancel */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-2 border border-gray-500 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </motion.div>
    </div>
    </AnimatePresence>
  );
};

export default AddTaskModal;
