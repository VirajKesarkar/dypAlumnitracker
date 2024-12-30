import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 shadow-lg flex flex-col space-y-6">
      <h2 className="text-2xl font-semibold text-gray-100">Alumni Tracker</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/updatepr" className="flex items-center gap-4 text-lg font-medium hover:text-gray-300 transition-colors duration-300">
            <FaHome className="text-xl" /> Update Profile
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-4 text-lg font-medium hover:text-gray-300 transition-colors duration-300">
            <FcBusinessman className="text-xl" /> Job Posts
          </Link>
        </li>
        <li>
          <Link to="/events" className="flex items-center gap-4 text-lg font-medium hover:text-gray-300 transition-colors duration-300">
            <FaUserFriends className="text-xl" /> Events
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;