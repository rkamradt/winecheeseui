import React from 'react'
import Header from './header'
import { withAuth } from '@okta/okta-react'
import { useAuth } from './auth'

const Screen = withAuth(({ auth }) => {
  const [authenticated, accessToken] = useAuth(auth)
  return (
    <div>
      <header>
        {authenticated !== null && (
          <div>
            <button
              onClick={() => authenticated ? auth.logout() : auth.login()}
            >
              Log {authenticated ? 'out' : 'in'}
            </button>
            <div>
              <Header />
            </div>
          </div>
        )}
        {accessToken !== null && (
          <div>
            <p>{accessToken}</p>
          </div>
        )}
      </header>
    </div>
  )
})

export default Screen
