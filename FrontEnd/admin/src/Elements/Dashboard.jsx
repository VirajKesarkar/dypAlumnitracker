import React, { useState } from 'react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddAlumni = () => {
    // Redirect to the Clerk dashboard URL for adding alumni
    window.location.href = "https://dashboard.clerk.com/apps/app_2nSxPEtvstJzrVfT3wFgr97VYW4/instances/ins_2nSxPJ4okY2UytTMPpgF1FhikcH/users";
  };

  const handleSearchAlumni = () => {
    console.log("Searching alumni:", searchQuery);
  };

  const handlePostEvent = () => {
    console.log("Post Event");
  };

  const handleSimpleAction = () => {
    // Redirect to the chat page
    window.location.href = "/chat";  // Replace with your actual chat page URL
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Add Alumni */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Alumni</h2>
          <button
            onClick={handleAddAlumni}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Alumni
          </button>
        </div>

        {/* Search Alumni */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Alumni</h2>
          <input
            type="text"
            placeholder="Enter alumni name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md mb-4 w-full"
          />
          <button
            onClick={handleSearchAlumni}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Search Alumni
          </button>
        </div>

        {/* Post Event */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Post Event</h2>
          <button
            onClick={handlePostEvent}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Post Event
          </button>
        </div>
      </div>

      {/* Simple Action Button */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simple Action</h2>
        <button
          onClick={handleSimpleAction}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Go to Chat Page
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Events</h2>
        <ul>
          <li className="border-b py-2">Networking Event - Nov 20, 2024</li>
          <li className="border-b py-2">Alumni Meetup - Dec 15, 2024</li>
          <li className="border-b py-2">Workshop on Career Development - Jan 10, 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
