import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobPosts from '../Components/JobPosts';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);  // State to hold job posts

  const handleAddAlumni = () => {
    // Redirect to the Clerk dashboard URL for adding alumni
    window.location.href = "https://dashboard.clerk.com/apps/app_2nSxPEtvstJzrVfT3wFgr97VYW4/instances/ins_2nSxPJ4okY2UytTMPpgF1FhikcH/users";
  };

  const handleSearchAlumni = () => {
    console.log("Searching alumni:", searchQuery);
    // Simulating search results for demonstration
    const mockResults = [
      { id: 1, name: "John Doe", batch: "2020", email: "john.doe@example.com" },
      { id: 2, name: "Jane Smith", batch: "2019", email: "jane.smith@example.com" },
    ];
    const filteredResults = mockResults.filter((alumni) =>
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handlePostEvent = () => {
    console.log("Post Event");
  };

  const handleSimpleAction = () => {
    // Redirect to the chat page
    window.location.href = "/chat"; // Replace with your actual chat page URL
  };

  useEffect(() => {
    // Fetch job posts from the backend when the component mounts
    axios.get('http://localhost:5000/api/jobs')
      .then(response => {
        setJobPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching job posts:', error);
      });
  }, []);  
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
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {showSearch ? 'Close Search' : 'Search Alumni'}
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

      {/* Search Alumni Section */}
      {showSearch && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Search Alumni</h2>
          <input
            type="text"
            placeholder="Enter alumni name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md mb-4 w-full"
          />
          <button
            onClick={handleSearchAlumni}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-4"
          >
            Search
          </button>

          {/* Search Results */}
          <div>
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-300">
                {searchResults.map((result) => (
                  <li key={result.id} className="py-2">
                    <p className="text-lg font-semibold">{result.name}</p>
                    <p className="text-gray-600">Batch: {result.graduation_year}</p>
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
<JobPosts/>
      </div>
    
  );
};

export default Dashboard;
