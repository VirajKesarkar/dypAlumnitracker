import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

function UpdateProfile() {
  const { userId } = useAuth();
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

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/alumni/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...data,
            skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/alumni/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map(skill => skill.trim())
        })
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.message}`);
      }
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  // Fields that should be read-only
  const readOnlyFields = [
    'first_name', 
    'last_name', 
    'graduation_year', 
    'clerk_id'
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Update Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(formData).map(([fieldName, value]) => (
          <div key={fieldName} className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2 capitalize">
              {fieldName.replace(/_/g, ' ')}:
            </label>
            <input
              type={fieldName === 'email' ? 'email' : 
                   fieldName === 'graduation_year' ? 'number' : 
                   fieldName === 'linkedin_profile' ? 'url' : 'text'}
              name={fieldName}
              value={value}
              onChange={handleChange}
              readOnly={readOnlyFields.includes(fieldName)}
              placeholder={`Enter your ${fieldName.replace(/_/g, ' ')}`}
              className={`px-4 py-3 border rounded-lg focus:outline-none ${
                readOnlyFields.includes(fieldName)
                  ? "bg-gray-100 cursor-not-allowed border-red-300"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;