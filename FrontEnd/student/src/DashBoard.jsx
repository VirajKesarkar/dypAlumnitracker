import React from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-700 p-6 text-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Content */}
      <main className="p-10">
        <SignedIn>
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">
            Welcome, {user.firstName}!
          </h2>
          <p className="text-lg text-gray-700">
            Here's the dashboard where you can track your activities, view alumni job postings, and much more!
          </p>
        </SignedIn>

        <SignedOut>
          <p className="text-red-500">You must sign in to view the dashboard.</p>
        </SignedOut>
      </main>
    </div>
  );
};

export default Dashboard;
