// src/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebase.config';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-around items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          pocketclass
        </Link>
        <ul className="flex space-x-12 text-xl">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
