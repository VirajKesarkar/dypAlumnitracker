import React from 'react';

import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';

// Import components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import EventPostsForm from './Components/EventPostForm';

// Import elements
import Sidebar from './Elements/Sidebar';
import Widget from './Elements/Widget';
import SearchAlumni from './Elements/SearchAlumni';
import AlumniProfile from './Elements/AlumniProfile'; // Example additional file
import Notifications from './Elements/Notifications'; // Example additional file

export const App = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Dashboard />
          <EventPostsForm />
          <SearchAlumni />
          <Widget />
          {/* Example additional components */}
          <AlumniProfile />
          <Notifications />
        </SignedIn>
      </header>
      <Footer />
    </div>
  );
};

export default App;