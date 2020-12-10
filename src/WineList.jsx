import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const WineList = () => {
  const [wineList, setWineList] = useState(null)
  const [wineListError, setWineListError] = useState(false)
  const [checked, setChecked] = React.useState([0])
  const classes = useStyles()

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }


  // fetch messages
  useEffect(() => {
      fetch('https://phprest.kamradtfamily.net/api/pairing')
        .then((response) => {
          if (!response.ok) {
            return Promise.reject()
          }
          return response.json()
        })
        .then((data) => {
          const pairings = data.map((pairing) => {
            return {
              wine: pairing.wine,
              cheese: pairing.cheese,
              id: `wine-pairing-${pairing.id}`,
            }
          })
          setWineList(pairings)
          setWineListError(false)
        })
        .catch((err) => {
          setWineListError(true)
          console.error(err)
        })
  }, [wineList, wineListError])

  return (
    <Box>
      {wineListError && <p>Error getting list</p>}
      {!wineList && !wineListError && <p>Accessing Server</p>}
      {wineList
      && (
        <List className={classes.root}>
            {wineList.map((pairing) => (
              <ListItem key={pairing.id}
                  role={undefined}
                  dense
                  button onClick={handleToggle(pairing.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': pairing.id }}
                  />
                </ListItemIcon>
                <ListItemText id={pairing.id}
                  primary={`${pairing.wine}/${pairing.cheese}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  )
}

export default WineList
