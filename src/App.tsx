import React, { useEffect, useState } from 'react';
import './styles/App.css';
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TopBar from './components/TopBar';
import { handleCallbackResponse } from './util/googleSignIn/handleCallbackResponse';
import LoginScreen from './pages/LogInScreen';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    name: string;
    picture: string;
  } | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('google_token');
    // Prevent auto-select of the previously logged in account
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  // Initialize Google Sign-In
  const initializeGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: "144539137320-fjf8rp49u33evb065t053u95d50mndah.apps.googleusercontent.com",
        callback: (response) => {
          handleCallbackResponse(response, setUser, setIsAuthenticated);
        }
      });

      // Render the Google Sign-In button if not authenticated
      if (!isAuthenticated) {
        const signInDiv = document.getElementById("signInDiv");
        if (signInDiv) {
          window.google.accounts.id.renderButton(
            signInDiv,
            { theme: "outline", size: "large" }
          );
        }
      }
      setIsGoogleLoaded(true);
    }
  };

  // Check for Google API loading
  useEffect(() => {
    const checkGoogleLoaded = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(checkGoogleLoaded);
        initializeGoogleSignIn();
      }
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(checkGoogleLoaded);
  }, []);

  // Check for existing token
  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      // Check if token is expired
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser({
          email: decodedToken.email,
          name: decodedToken.name,
          picture: decodedToken.picture
        });
        setIsAuthenticated(true);
      } else {
        // Token expired, remove it
        localStorage.removeItem('google_token');
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        {!isAuthenticated ? (
          <div>
            <div>
              <LoginScreen/>
              {!isGoogleLoaded && (
                <p>Loading sign-in...</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <TopBar logout={handleLogout} userName={user?.name}/>
            <RouterProvider router={router} />
          </div>
        )}
    </QueryClientProvider>
  );
}

export default App;