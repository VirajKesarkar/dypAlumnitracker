import React from "react";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Import your components
import EventPostForm from "./Components/EventPostForm";
import JobPosts from "./Components/JobPosts";
import AdminLogin from "./Elements/AdminLogin"; // assuming this is in src/Elements

const clerkFrontendApi = "YOUR_CLERK_FRONTEND_API"; // replace with your actual Clerk frontend API

const App = () => {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

// Home Page - where the login button will be
const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleLoginRedirect} className="login-button">
        Go to Login
      </button>
    </div>
  );
};

// Login Page - using Clerk's SignIn component
const Login = () => {
  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h2>Please Sign In</h2>
      <SignIn />
    </div>
  );
};

// Dashboard Page - only visible after successful login
const Dashboard = () => {
  return (
    <SignedIn>
      <div className="App">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
          <h1>Welcome to the Dashboard</h1>
          <UserButton />
        </header>

        <main style={{ padding: "1rem" }}>
          <section>
            <h2>Post an Event</h2>
            <EventPostForm />
          </section>

          <section>
            <h2>Available Job Posts</h2>
            <JobPosts />
          </section>

          <section>
            <h2>Admin Login Section</h2>
            <AdminLogin />
          </section>
        </main>
      </div>
    </SignedIn>
  );
};

export default App;
