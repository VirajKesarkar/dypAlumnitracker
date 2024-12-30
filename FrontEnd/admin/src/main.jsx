import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Elements/Dashboard';
import Body from './Components/Body';
import Events from './Elements/Events';
import Profile from './Elements/Profile';
import AdminChatInterface from './Elements/AdminChatInterface';

// Define routes
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
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "chat", // New route for AdminChatInterface
        element: <AdminChatInterface />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
