import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider, SignedIn } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Elements/Dashboard';
import Body from './Components/Body';
import Events from './Elements/Events';
import UpdateProfile from './Elements/UpdateProfile';
import Profile from './Elements/Profile';
import ChatInterface from './Elements/ChatInterface'; // Import Chat Page

const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env;

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  console.error('Clerk Publishable Key is missing! Please add it to your .env file.');
}

// Define routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/", 
        element: <Body /> 
      },
      {
        path: "dashboard",
        element: (
          <SignedIn>
            <Dashboard />
          </SignedIn>
        ),
      },
      {
        path: "updatepr",
        element: (
          <SignedIn>
            <UpdateProfile />
          </SignedIn>
        ),
      },
      {
        path: "profile",
        element: (
          <SignedIn>
            <Profile />
          </SignedIn>
        ),
      },
      {
        path: "events",
        element: (
          <SignedIn>
            <Events />
          </SignedIn>
        ),
      },
      {
        path: "chat", // Add this route for Chat Page
        element: (
          <SignedIn>
            <ChatInterface />
          </SignedIn>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
