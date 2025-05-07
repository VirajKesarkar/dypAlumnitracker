import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JobPosts from '../Components/JobPosts';
import EventPostForm from '../Components/EventPostForm';
import { useClerk } from '@clerk/clerk-react'; // Import Clerk hook

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk(); // Access the signOut function from Clerk
  const [searchQuery, setSearchQuery] = useState('');
  const [showSection, setShowSection] = useState({ search: false, eventForm: false });
  const [searchResults, setSearchResults] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);

  // Check Authentication
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        navigate('/elements/dashboard'); // Redirect if no token
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        console.log(response.data); // Log response
        setJobPosts(response.data);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleSearchAlumni = () => {
    console.log("Searching alumni:", searchQuery);
    const mockResults = [
      { id: 1, name: "John Doe", batch: "2020", email: "john.doe@example.com" },
      { id: 2, name: "Jane Smith", batch: "2019", email: "jane.smith@example.com" },
    ];
    setSearchResults(
      mockResults.filter(alumni => alumni.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const toggleSection = (section) => {
    setShowSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sign out handler
  const handleSignOut = () => {
    signOut(); // Sign out the user using Clerk
    navigate('/'); // Redirect to the home or login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 relative">
      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
      >
        Sign Out
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-4">Admin Dashboard</h1>

      {/* Main Container */}
      <div className="w-full max-w-6xl px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Search Alumni Button */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Search Alumni</h2>
            <button
              onClick={() => toggleSection('search')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              {showSection.search ? 'Close Search' : 'Search Alumni'}
            </button>
          </div>

          {/* Post Event Button */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Post Event</h2>
            <button
              onClick={() => toggleSection('eventForm')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              {showSection.eventForm ? 'Close Event Form' : 'Post Event'}
            </button>
          </div>
        </div>

        {/* Search Alumni Section */}
        {showSection.search && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Alumni</h2>
            <input
              type="text"
              placeholder="Enter alumni name or ID"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearchAlumni();
              }}
              className="px-3 py-2 border rounded-md mb-4 w-full"
            />
            <div className="max-h-48 overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="divide-y divide-gray-300">
                  {searchResults.map((result) => (
                    <li key={result.id} className="py-2">
                      <p className="text-lg font-semibold">{result.name}</p>
                      <p className="text-gray-600">Batch: {result.batch}</p>
                      <p className="text-gray-600">Email: {result.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found.</p>
              )}
            </div>
          </div>
        )}

        {/* Event Form Section */}
        {showSection.eventForm && <EventPostForm />}

        {/* Job Posts Section */}
        <div className="w-full">
          <JobPosts jobPosts={jobPosts} /> {/* Pass jobPosts as a prop */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
