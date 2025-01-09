import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const { user } = useUser(); // Get Clerk user data
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const email = user.primaryEmailAddress.emailAddress; // Clerk user's email

      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:5000/profile/${email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          setProfile(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
        Loading profile...
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

  if (!profile) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center text-gray-500">
        Profile information not available.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex items-center">
  
      <div className="ml-4">
        <h2 className="text-2xl font-semibold">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600">Graduation Year: {profile.graduation_year}</p>
        <p className="text-gray-600">Major: {profile.course}</p>
        <p className="text-gray-600">
          Current Position: {profile.post} at {profile.current_company}
        </p>
        <p className="text-gray-600">Skills: {profile.skills}</p>
        <a
          href={profile.linkedin_profile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          LinkedIn Profile
        </a>
      </div>
    </div>
  );
};

export default Profile;
