import React from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-grow p-8 space-y-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-4xl font-semibold text-gray-800">Welcome, Viraj Kesarkar</h1>
          <button
            onClick={handleSignOut}
            className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition-transform transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-white opacity-10 rounded-lg blur-lg"></span>
            <span className="relative">Sign Out</span>
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Profile />
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
