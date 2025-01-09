import React, { useEffect, useState } from 'react';

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch job posts');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const deleteJobPost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job post');
      }

      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err.message);
      alert('Error deleting job post');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
        Loading job posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center text-gray-500">
        No job posts available.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6">Job Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{job.post}</h2>
            <p className="text-gray-600">Company: {job.company_name}</p>
            <p className="text-gray-600">Vacancies: {job.vacancies}</p>
            <p className="text-gray-600">Required Degree: {job.degree}</p>
            <p className="text-gray-600">Required CGPA: {job.cgpa}</p>
            <p className="text-gray-600">Skills: {job.skills}</p>
            <p className="text-gray-600">Contact: {job.contact_number}</p>
            <p className="text-gray-600">
              Posted By: {job.alumni_name} ({job.contact_number})
            </p>
            <button
              onClick={() => deleteJobPost(job.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Job Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosts;
