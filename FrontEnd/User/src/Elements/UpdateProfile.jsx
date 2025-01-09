import React, { useState } from "react";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phoneno: "",
    graduation_year: "",
    course: "",
    clerk_id: "",
    current_company: "",
    post: "",
    skills: "",
    linkedin_profile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/alumni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.json();
      alert("Your information is updated");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phoneno: "",
        graduation_year: "",
        course: "",
        clerk_id: "",
        current_company: "",
        post: "",
        skills: "",
        linkedin_profile: ""
      });
    } else {
      alert("Failed to update your information. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Phone Number:</label>
          <input
            type="text"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Graduation Year:</label>
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            placeholder="Enter your graduation year"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter your course"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Clerk ID:</label>
          <input
            type="text"
            name="clerk_id"
            value={formData.clerk_id}
            onChange={handleChange}
            placeholder="Enter your clerk ID"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Current Company:</label>
          <input
            type="text"
            name="current_company"
            value={formData.current_company}
            onChange={handleChange}
            placeholder="Enter your current company"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Position:</label>
          <input
            type="text"
            name="post"
            value={formData.post}
            onChange={handleChange}
            placeholder="Enter your position"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Enter your skills (separated by commas)"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">LinkedIn Profile:</label>
          <input
            type="url"
            name="linkedin_profile"
            value={formData.linkedin_profile}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile URL"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Information
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
