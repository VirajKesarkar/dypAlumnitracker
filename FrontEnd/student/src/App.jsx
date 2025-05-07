import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import LandingPage from './LandingPage';
import Dashboard from './DashBoard';
import RequireAuth from './RequireAuth'; // We'll create a small component for protected routes
const PUBLISHABLE_KEY= "pk_test_cmVsaWV2ZWQtcHJpbWF0ZS03MC5jbGVyay5hY2NvdW50cy5kZXYk"; 

const App = () => {
  return (
    <ClerkProvider frontendApi={PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

export default App;
