import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Formik } from "formik";

const Login = () => {
  const { logIn } = UserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError(""); // Clear any previous error messages
    try {
      await logIn(values.email, values.password); // Attempt to log in
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.log(error);
      setError(error.message); // Display error message if login fails
    }
    setSubmitting(false); // Reset form submission state
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <h1 className="text-4xl font-semibold p-2 px-5 font-title">tudu</h1>
      <div className="flex items-center justify-center py-10 ">
        <div className="w-full max-w-md">
          {/* Formik form for handling form validation and submission */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              // Validate email format
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              // Validate password presence
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={handleSubmit} // Handle form submission
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-lg p-10 pb-14 mb-4"
              >
                <h1 className="text-3xl font-semibold mb-2">Sign in</h1>
                <p className="text-gray-400 text-sm  mb-8">
                  Welcome back to Tudu. Login to access your account and
                  discover amazing features.
                </p>
                <div className="mb-4">
                  {/* Email input field */}
                  <input
                    className={`appearance-none border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  {/* Password input field */}
                  <input
                    className={`appearance-none border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* Submit button */}
                <button
                  className="bg-black mb-5 transition-all duration-300 hover:bg-blue-500 text-white w-full font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
                {/* Link to sign up page */}
                <div className="flex items-center gap-1 text-sm">
                  <p className="text-gray-400 font-light">New to Tudu? </p>
                  <Link
                    to="/signup"
                    className="inline-block align-baseline  text-blue-500 hover:text-blue-800"
                  >
                    Sign up
                  </Link>
                </div>
                {/* Display error message if login fails */}
                {error && (
                  <div className="text-red-500 text-xs italic mt-2">
                    {error}
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
