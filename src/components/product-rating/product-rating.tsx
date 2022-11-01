import {RATING_MAX} from '../../const';

type ProductRatingProps = {
  rating: number;
}

function ProductRating({rating}: ProductRatingProps): JSX.Element {
  return (
    <>
      {Array.from({length: RATING_MAX}, (_value, index) => (
        <svg width="17" height="16" aria-hidden="true" key={index} data-testid="rating">
          <use xlinkHref={`#icon-${index >= rating ? 'star' : 'full-star'}`}></use>
        </svg>
      )
      )}
    </>
  );
}

export default ProductRating;
