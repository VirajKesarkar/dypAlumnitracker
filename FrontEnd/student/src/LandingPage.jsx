import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    if (user && isLoaded) {
      setProfile({
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0]?.emailAddress,
        image: user.profileImageUrl,
      });
    }
  }, [user, isLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">Alumni-Student Portal</h1>
        <div>
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 gap-10">
        {/* Left */}
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="text-4xl font-bold text-blue-700 mb-6 leading-tight">
            Empower Your Learning Journey
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Welcome to Alumni Tracking System - where your progress is our priority. Track your attendance, view assignments, receive notifications, and manage your profile — all in one place!
          </p>
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Right */}
        <div className="w-full max-w-md">
          <img
            src="https://images.unsplash.com/photo-1584697964154-92b24ca79503?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Students working"
            className="rounded-3xl shadow-lg"
          />
        </div>
      </main>

      {/* Profile Section */}
      <section className="p-8 bg-white shadow-inner rounded-t-3xl mt-10">
        <SignedIn>
          {profile ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-md"
              />
              <h3 className="text-2xl font-semibold">{profile.fullName}</h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </SignedIn>

        <SignedOut>
          <p className="text-center text-gray-600">Sign in to view your personalized dashboard.</p>
        </SignedOut>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Alumni System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
