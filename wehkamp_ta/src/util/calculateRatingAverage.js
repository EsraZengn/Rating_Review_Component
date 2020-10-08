export default function calculateRatingAverage(array) {
  if (array.length === 0) {
    return '';
  }
  const ratingArray = array.map((arrItem) => arrItem.rating).filter((rating) => rating !== 0);
  const total = ratingArray.reduce((result, current) => result + current, 0);

  const median = total / ratingArray.length;

  return median.toFixed(1);
}
