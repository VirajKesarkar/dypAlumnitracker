import React, { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Dashboard from './Elements/Dashboard';
import Events from './Elements/Events';
import UpdateProfile from './Elements/UpdateProfile';
import AdminChatInterface from './Elements/AdminChatInterface'; // Import chat component

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hardcoded credentials
  const hardcodedEmail = "admin@example.com";
  const hardcodedPassword = "password123";

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedEmail && password === hardcodedPassword) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  // Check if the current route is '/dashboard', '/events', '/updatepr', or '/chat'
  const isNoHeaderFooterRoute = 
    location.pathname === "/dashboard" || 
    location.pathname === "/events" || 
    location.pathname === "/updatepr" || 
    location.pathname === "/chat";  // Added /chat route

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center px-6 py-7">
      {/* Conditionally render Header and Footer */}
      {!isNoHeaderFooterRoute && <Header />} 

      <div className="flex w-full">
        <div className="flex-1 ml-6">
          <Routes>
            {!isLoggedIn ? (
              <Route 
                path="/" 
                element={
                  <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                          placeholder="admin@example.com"
                          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                          placeholder="••••••••"
                          className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                      </div>
                      {error && <p className="text-red-500 text-center">{error}</p>}
                      <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                } 
              />
            ) : (
              <>
                <Route path="/" element={<Body />} /> {/* Landing page */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/updatepr" element={<UpdateProfile />} />
                <Route path="/chat" element={<AdminChatInterface />} /> {/* Chat route */}
              </>
            )}
          </Routes>
        </div>
      </div>

      {/* Conditionally render Footer */}
      {!isNoHeaderFooterRoute && <Footer />}
    </div>
  );
}

export default App;
