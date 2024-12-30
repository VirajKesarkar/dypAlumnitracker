// Profile.js
import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex items-center">
      <img src="./rs/vir.png" alt="Profile" className="h-16 w-16 rounded-full border-2 border-blue-500" />
      <div className="ml-4">
        <h2 className="text-2xl font-semibold">Viraj Kesarkar</h2>
      
        <p className="text-gray-600">virajkesarkar3273@gmail.com</p>   
        <p className="text-gray-600">Graduation Year: 2026</p>  
        <p className="text-gray-600">Major: Computer Science</p>
        <p className="text-gray-600">Current Position: Software Engineer at Cognizent</p>
      </div>
    </div>
  );
};

export default Profile;
