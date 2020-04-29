export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_RATING':
      let isNewRating = true;
      let result;

      const newState = state.map((item) => {
        if (item.author === action.author) {
          item.rating = action.rating;
          item.date = action.date;
          isNewRating = false;
        }
        return item;
      });

      if (isNewRating) {
        result = [
          ...state,
          { rating: action.rating, author: action.author, date: new Date(), review: '' },
        ];
      } else {
        result = newState;
      }
      return result;

    case 'SET_REVIEW':
      let isNewReview = true;

      const stateNew = state.map((item) => {
        if (item.author === action.author) {
          item.review = action.review;
          item.date = action.date;
          isNewReview = false;
        }
        return item;
      });

      if (isNewReview) {
        return [
          ...state,
          { rating: 0, author: action.author, date: new Date(), review: action.review },
        ];
      } else {
        return stateNew;
      }

    default:
      break;
  }
}
