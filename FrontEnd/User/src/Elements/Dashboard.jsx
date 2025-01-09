import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) {
          setUserName('Unknown User');
          return;
        }

        const response = await fetch(`http://localhost:5000/profile/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserName(`${data.first_name} ${data.last_name}`);
      } catch (err) {
        setError('Failed to fetch user details');
        setUserName('User');
      }
    };

    fetchUserName();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <Sidebar />
      <div className="flex-grow p-8 space-y-8">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {error ? <span className="text-red-600">{error}</span> : userName}
          </h1>
          <button
            onClick={handleSignOut}
            className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transform transition-all duration-300 hover:scale-105"
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
