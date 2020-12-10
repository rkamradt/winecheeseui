import { useOktaAuth } from '@okta/okta-react'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const EditButtons = () => {
  const { authState, oktaAuth } = useOktaAuth()
  const [userInfo, setUserInfo] = useState(null)
  const classes = useStyles();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, oktaAuth]) // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect()
  }

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <AppBar position="static" style={{ background: '#55FFDD' }}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}
            color="inherit"
            aria-label="menu">
          <MenuIcon />
        </IconButton>

        { authState.isAuthenticated && !userInfo
          && <Typography variant="h6"
               className={classes.title}>
               Loading user information...
             </Typography>}
        { authState.isAuthenticated && userInfo
          && <Typography variant="h6"
              className={classes.title}>
              Welcome back, {userInfo.name}!
            </Typography>}
        { !authState.isAuthenticated &&
          <Button color="inherit"
              onClick={login}>
            Login
          </Button>}
      </Toolbar>
    </AppBar>
  )
}

export default EditButtons
