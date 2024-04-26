import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import LogoutConfirmationModal from './LogoutModal';

// Navbar component for displaying the application title and logout button
const Navbar = () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-3 flex justify-between bg-gray-100 border-gray-200 border">
        <h1 className="text-4xl font-semibold  px-5 font-title">tudu</h1>
        <button
          name="Logout"
          className="text-xl text-gray-500 p-3 mx-4 rounded-full hover:bg-gray-200 hover:text-red-500 transition-all duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPower />
        </button>
      </div>
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
