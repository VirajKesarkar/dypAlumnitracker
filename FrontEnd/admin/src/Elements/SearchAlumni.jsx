import React, { useState } from 'react';
import axios from 'axios';

function SearchAlumni() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a valid search query.');
      setResults([]);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.get('/api/search-alumni', {
        params: { query },
      });
      setResults(response.data);

      if (response.data.length === 0) {
        setError('No alumni found matching your query.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch alumni data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Alumni</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, year, or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Results Table */}
      {!error && results.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Graduation Year</th>
              <th className="border border-gray-300 p-2">Company</th>
            </tr>
          </thead>
          <tbody>
            {results.map((alumni) => (
              <tr key={alumni.id}>
                <td className="border border-gray-300 p-2">{alumni.id}</td>
                <td className="border border-gray-300 p-2">{alumni.name}</td>
                <td className="border border-gray-300 p-2">{alumni.email}</td>
                <td className="border border-gray-300 p-2">{alumni.graduation_year}</td>
                <td className="border border-gray-300 p-2">{alumni.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchAlumni;
