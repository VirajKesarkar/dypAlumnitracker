import React, { useEffect, useState } from 'react';

// Now the images are in the public folder
const images = [
  '/ft1.jpg',
  '/ft2.jpg',
  '/ft3.jpg',
];


const Body = () => {
  return (
    <div className='lg:flex'>
 
      <div className='space-y-4 lg:flex-1 lg:order-1 lg:space-y-10'>
        <h1 className='text-5xl font-bold leading-tight font-playfair'>
          Welcome  Admin
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
