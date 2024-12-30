import React, { useEffect, useState } from 'react';

// Now the images are in the public folder
const images = [
  '/ft1.jpg',
  '/ft2.jpg',
  '/ft3.jpg',
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative flex items-center justify-center lg:flex-1 lg:order-2 lg:justify-end lg:overflow-hidden'>
      <img 
        src={images[currentIndex]} 
        alt={`Slide ${currentIndex}`} 
        className="rounded-lg border-4 border-blue-500 shadow-lg transform transition-transform duration-300"
      />
    </div>
  );
};

const Body = () => {
  return (
    <div className='lg:flex'>
      <Slideshow />
      <div className='space-y-4 lg:flex-1 lg:order-1 lg:space-y-10'>
        <h1 className='text-5xl font-bold leading-tight font-playfair'>
          Welcome to the Alumni Tracker System, where both alumni and DYPCET can connect with the community!
        </h1>
        <p className='font-lato text-neutral-950'>
          "Connecting Alumni, Building Futures: Your Journey Continues Here!"
        </p>
        
        

        <div className='flex gap-2'>
          {/* Other content can go here */}
        </div>
      </div>
    </div>
  );
};

export default Body;
