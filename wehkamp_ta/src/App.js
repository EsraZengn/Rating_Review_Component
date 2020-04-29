import React, { useState } from 'react';
import {
  makeStyles,
  Switch,
  FormGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  Divider,
} from '@material-ui/core';
import RatingAndReview from './components/RatingAndReview';
import './App.css';

function App() {
  const useStyles = makeStyles((theme) => ({
    form: {
      '& > *': {
        marginBottom: theme.spacing(2),
      },
      marginTop: '2em',
      marginBottom: '2em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      marginTop: '2em',
    },
    textField: {
      width: '10em',
      marginRight: '0.5em',
    },
    divider: {
      width: '80%',
    },
  }));

  const classes = useStyles();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userId, setUserId] = useState('');

  return (
    <div className="App">
      <FormLabel className={classes.label}>Set testing data</FormLabel>
      <FormGroup className={classes.form}>
        <FormControlLabel
          control={
            <TextField
              onChange={(event) => {
                setUserId(event.target.value);
              }}
              variant="outlined"
              className={classes.textField}
            />
          }
          label=" User ID"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isAuthorized}
              onChange={() => {
                setIsAuthorized((prev) => !prev);
              }}
            />
          }
          label="Authorized"
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <RatingAndReview isAuthorized={isAuthorized} userId={userId} />
    </div>
  );
}

export default App;
