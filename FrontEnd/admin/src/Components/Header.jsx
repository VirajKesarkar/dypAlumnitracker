import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-6 py-4'>
      {/* Centered Navigation Links */}
      <ul className='hidden lg:flex items-center font-lato text-black gap-8'>
        <li>
          <a href="https://coek.dypgroup.edu.in/about-dyp-group/" className="hover:underline">About</a>
        </li>
        <li>
          <a href="/placements" className="hover:underline">TBD</a>
        </li>
        <li className='mr-12'>
          <a href="/why-dypcet" className="hover:underline">TBD</a>
        </li>
      </ul>

    </div>
  );
}

export default Header;
