import React from 'react';
import Header from './header';
import { withAuth } from '@okta/okta-react';
import { useAuth } from './auth';

const Screen = withAuth(({ auth }) => {
  const authenticated = useAuth(auth)
  return (
    <div>
      <header>
        {authenticated !== null && (
          <div>
            <button
              onClick={() => authenticated ? auth.logout() : auth.login()}
              className="App-link"
            >
              Log {authenticated ? 'out' : 'in'}
            </button>
            <div className='container'>
              <Header />
              <canvas id='canvas' width='240' height='240' />
              <img id='squares' hidden={true} src='img/squares.png' alt=''/>
            </div>
          </div>
        )}
      </header>
    </div>
  );
});

export default Screen;
