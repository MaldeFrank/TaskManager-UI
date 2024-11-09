import React, { useEffect, useState } from 'react';
import './styles/App.css';
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Declare google global type
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: { theme: string; size: string }
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    name: string;
    picture: string;
  } | null>(null);

  const handleCallbackResponse = (response: { credential: string }) => {
    // Decode the JWT token
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    
    // Set user information
    setUser({
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture
    });
    
    setIsAuthenticated(true);
    
    // Store the token in localStorage for persistence
    localStorage.setItem('google_token', response.credential);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('google_token');
    // Prevent auto-select of the previously logged in account
    window.google.accounts.id.disableAutoSelect();
  };

  useEffect(() => {
    // Check for existing token on mount
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

    // Initialize Google Sign-In
    window.google.accounts.id.initialize({
      client_id: "144539137320-fjf8rp49u33evb065t053u95d50mndah.apps.googleusercontent.com",
      callback: handleCallbackResponse
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
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <h1 className="mb-6 text-2xl font-bold text-center">Welcome</h1>
              <div id="signInDiv" className="mb-4"></div>
            </div>
          </div>
        ) : (
          <div>
            {user && (
              <div className="p-4 bg-gray-100 border-b">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            <RouterProvider router={router} />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;