// filepath: c:\Users\Viraj\OneDrive\Desktop\Main\dyp alumni tracker\FrontEnd\student\src\RequireAuth.jsx
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';

const RequireAuth = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children;
};

export default RequireAuth;