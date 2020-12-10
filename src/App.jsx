import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { OktaAuth } from '@okta/okta-auth-js'
import { Security, LoginCallback } from '@okta/okta-react'
import Home from './Home'

const CLIENT_ID = '0oag1oxllhj9N2SPV4x6'
const ISSUER = 'https://dev-804011.okta.com/oauth2/default'
const OKTA_TESTING_DISABLEHTTPSCHECK = true
const REDIRECT_URI = `${window.location.origin}/implicit/callback`

const config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
  }
}

const oktaAuth = new OktaAuth(config.oidc)

const App = () => (
  <Router>
    <Security oktaAuth={oktaAuth}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
    </Security>
  </Router>
)
export default App
