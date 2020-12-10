import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#206cff',
    },
    secondary: {
      main: '#305022',
    },
    error: {
      main: '#111111',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
