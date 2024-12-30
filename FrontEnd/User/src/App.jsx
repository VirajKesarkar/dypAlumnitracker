import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Dashboard from './Elements/Dashboard';
import Events from './Elements/Events';
import { useAuth } from "@clerk/clerk-react";
import UpdateProfile from './Elements/UpdateProfile';
import ChatInterface from './Elements/ChatInterface'; // Import ChatInterface

function App() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard'); // Redirect if signed in
    }
  }, [isSignedIn, navigate]);

  // Check if the current route is '/dashboard', '/events', '/updatepr', or '/chat'
  const isNoHeaderFooterRoute = ["/dashboard", "/events", "/updatepr", "/chat"].includes(location.pathname);

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center px-6 py-7">
      {/* Conditionally render Header and Footer */}
      {!isNoHeaderFooterRoute && <Header />} {/* Do not render on specific pages */}
      
      <div className="flex w-full">
        {/* Main content area */}
        <div className="flex-1 ml-6">
          <Routes>
            <Route path="/" element={<Body />} /> {/* Landing page */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/updatepr" element={<UpdateProfile />} />
            <Route path="/chat" element={<ChatInterface />} /> {/* Add ChatInterface route */}
          </Routes>
        </div>
      </div>

      {/* Conditionally render Footer */}
      {!isNoHeaderFooterRoute && <Footer />} {/* Do not render on specific pages */}
    </div>
  );
}

export default App;
