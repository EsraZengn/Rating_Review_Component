import React, { useState } from 'react';
import { Rating } from '@material-ui/lab';
import { Card } from '@material-ui/core';

const RatingAndReview = () => {
  const [ratingsAndReviews, setRatingAndReviews] = useState([]);
  const [value, setValue] = useState(0)

  return (
    <>
      <Card>
        <Rating name='simple-controlled' value={value} onChange={(e, newValue)=>setValue(newValue)}/>
      </Card>
    </>
  );
};

export default RatingAndReview;
