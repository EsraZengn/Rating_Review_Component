import React, { useReducer, useState } from 'react';
import { Rating } from '@material-ui/lab';
import { Box, makeStyles, Button, TextField, Typography, Paper, Divider } from '@material-ui/core';
import calculateRatingAverage from '../util/calculateRatingAverage';
import reducer from '../util/ratingAndReviewReducer';
import '../RatingAndReview.scss';

const useStyles = makeStyles((theme) => ({
  rating: {
    '& > *': {
      margin: theme.spacing(2),
    },
    marginTop: '2em',
  },
  review: {
    '& > *': {
      margin: theme.spacing(2),
    },
    flexDirection: 'column',
  },
  paper: {
    width: '50%',
  },
  reviewHeader: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
    marginTop: '2em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
    display: 'flex',
  },
  divider: {
    width: '100%',
  },
  typography: {
    margin: '1em',
  },
}));

const RatingAndReview = ({ isAuthorized, userId }) => {
  //localStorage.removeItem('ratingsAndReviews');
  const initialRatingsAndReviews = JSON.parse(localStorage.getItem('ratingsAndReviews'))
    ? JSON.parse(localStorage.getItem('ratingsAndReviews'))
    : [];

  const [savedRatingsAndReviews, setSavedRatingAndReviews] = useState(
    JSON.parse(localStorage.getItem('ratingsAndReviews'))
      ? JSON.parse(localStorage.getItem('ratingsAndReviews'))
      : [],
  );

  const [ratingsAndReviews, dispatch] = useReducer(reducer, initialRatingsAndReviews);
  const [expanded, setExpanded] = React.useState(true);
  const [rating, setRating] = useState(Number(calculateRatingAverage(savedRatingsAndReviews)));
  const [review, setReview] = useState('');

  const classes = useStyles();

  const handleRatingChange = (e, newValue) => {
    setRating(newValue);
    dispatch({
      type: 'SET_RATING',
      rating: newValue,
      author: userId,
      date: new Date(),
    });
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    dispatch({
      type: 'SET_REVIEW',
      review: event.target.value,
      author: userId,
      date: new Date(),
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSendBtnClick = () => {
    localStorage.setItem('ratingsAndReviews', JSON.stringify(ratingsAndReviews));
    setSavedRatingAndReviews(JSON.parse(localStorage.getItem('ratingsAndReviews')));
    setRating(Number(calculateRatingAverage(ratingsAndReviews)));
    setReview('');
  };

  return (
    <>
      <div className={`${classes.rating} flex-display`}>
        <Rating
          name="rating"
          value={rating}
          readOnly={!isAuthorized || !userId}
          onChange={handleRatingChange}
        />
        <Box ml={2}>{calculateRatingAverage(savedRatingsAndReviews)}</Box>
      </div>
      {isAuthorized && userId && (
        <div className={`${classes.review} flex-display`}>
          <TextField
            name="review"
            id="reviewField"
            label="Review"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
          />
          <Button variant="contained" color="primary" onClick={handleSendBtnClick}>
            SEND
          </Button>
        </div>
      )}
      <Button onClick={handleExpandClick}>{expanded ? 'Hide reviews' : 'Show reviews'}</Button>
      {expanded && (
        <Paper className={'paper'}>
          {savedRatingsAndReviews.length !== 0 ? (
            savedRatingsAndReviews
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item) => {
                return (
                  <div key={item.author}>
                    <div className={classes.reviewHeader}>
                      <div className={classes.name}>
                        {item.rating !== 0 && (
                          <Rating name={item.author} value={item.rating} readOnly />
                        )}
                        <Typography color="primary" component="h4" gutterBottom>
                          {item.author}
                        </Typography>
                      </div>
                      <Typography color="textSecondary">
                        {new Date(item.date).toLocaleDateString()}
                      </Typography>
                    </div>
                    <Typography className={classes.typography} gutterBottom>
                      {item.review}
                    </Typography>
                    <Divider className={classes.divider} />
                  </div>
                );
              })
          ) : (
            <Typography className={classes.typography}>No reviews yet..</Typography>
          )}
        </Paper>
      )}
    </>
  );
};

export default RatingAndReview;
