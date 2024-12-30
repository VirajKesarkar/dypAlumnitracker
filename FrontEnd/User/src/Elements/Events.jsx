import React, { useState } from 'react';

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image URLs for the slideshow (replace these with your flyer images)
  const eventImages = [
    '/rs/flyer1.png',
    '/rs/flyer2.png',
    '/rs/flyer3.png',
    '/rs/flyer4.png',
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + eventImages.length) % eventImages.length
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Upcoming College Events</h2>

      {/* Slideshow Container */}
      <div className="relative w-full max-w-3xl mx-auto mb-12">
        {/* Slideshow Image */}
        <img
          src={eventImages[currentIndex]}
          alt={`Event Flyer ${currentIndex + 1}`}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />

        {/* Slideshow Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          &#10095;
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Event Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img
              src="/rs/alumni-meet.jpg"
              alt="Alumni Meet"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          <h3 className="text-2xl font-semibold text-blue-600 mt-4">Alumni Meet</h3>
          <p className="text-gray-600 mb-4">Reconnect with your peers and professors in this exciting Alumni Meet!</p>
          <div className="text-sm text-gray-500">
            <p><strong>Date:</strong> January 20, 2024</p>
            <p><strong>Location:</strong> College Auditorium</p>
          </div>
        </div>

        {/* Event Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img
              src="/rs/tech-conference.jpg"
              alt="Tech Conference"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          <h3 className="text-2xl font-semibold text-blue-600 mt-4">Tech Conference</h3>
          <p className="text-gray-600 mb-4">Explore the latest in technology trends, workshops, and networking with industry leaders.</p>
          <div className="text-sm text-gray-500">
            <p><strong>Date:</strong> February 15, 2024</p>
            <p><strong>Location:</strong> Seminar Hall</p>
          </div>
        </div>

        {/* Event Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img
              src="/rs/hackathon.jpg"
              alt="Hackathon"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
          <h3 className="text-2xl font-semibold text-blue-600 mt-4">Hackathon</h3>
          <p className="text-gray-600 mb-4">Join the ultimate 24-hour coding challenge with exciting prizes and surprises!</p>
          <div className="text-sm text-gray-500">
            <p><strong>Date:</strong> March 12, 2024</p>
            <p><strong>Location:</strong> Computer Science Department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
