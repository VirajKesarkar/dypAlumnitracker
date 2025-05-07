// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import { Navigate } from "react-router-dom";

import Dashboard from "./Elements/Dashboard";
import EventPostForm from "./Components/EventPostForm";

import "./index.css";

// Clerk publishable key from .env
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ✅ Redirect wrapper
const RedirectToDashboard = () => <Navigate to="/elements/dashboard" replace />;

// ✅ ProtectedRoute wrapper
const ProtectedRoute = ({ element }) => (
  <>
    <SignedIn>{element}</SignedIn>
    <SignedOut>
      <RedirectToSignIn redirectUrl="/elements/dashboard" />
    </SignedOut>
  </>
);

const router = createBrowserRouter([
  // ✅ Safe redirect using a component
  { path: "/", element: <RedirectToDashboard /> },

  { path: "/elements/dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
  { path: "/dashboard/post-event", element: <ProtectedRoute element={<EventPostForm />} /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
