import WineList from './WineList'
import EditButtons from './EditButtons'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Randal Kamradt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <EditButtons />
        <Typography variant="h4" component="h1" gutterBottom>
          Wine & Cheese Pairing App
        </Typography>
        <WineList />
        <Copyright />
      </Box>
    </Container>
  )
}
export default Home
