import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect();
  };

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <h1 as="h1">Wine & Cheese Pairing App</h1>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            Welcome back, {userInfo.name}!
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <button id="login-button" primary onClick={login}>Login</button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
