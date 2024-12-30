import React from 'react';
import { FaBars } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className='flex justify-between items-center px-6 py-4'>
      {/* Centered Navigation Links */}
      <ul className='hidden lg:flex items-center font-lato text-black gap-8'>
        <li>
          <a href="https://coek.dypgroup.edu.in/about-dyp-group/" className="hover:underline">About</a>
        </li>
        <li>
          <a href="/placements" className="hover:underline">Placements</a>
        </li>
        <li className='mr-12'>
          <a href="/why-dypcet" className="hover:underline">Why DYPCET</a>
        </li>
      </ul>

      {/* Sign-In and User Profile Buttons */}
      <div className='hidden lg:flex items-center gap-4'>
        <SignedOut>
          <SignInButton>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Sign In
            </span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Icon */}
     
    </div>
  );
}

export default Header;
