import {useState} from 'react';
import dayjs from 'dayjs';
import ReviewCard from '../review-card/review-card';
import {Review} from '../../types/review';
import {REVIEW_PER_SHOW} from '../../const';

const getWeightForNullDate = (dateA: Date, dateB: Date) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortReviewsDate = (reviewA: Review, reviewB: Review) => {
  const weight = getWeightForNullDate(reviewA.createAt, reviewB.createAt);

  return weight ?? dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
};

type ReviewProps = {
  reviews: Review[];
  onAddReviewClick: () => void;
}

function Reviews({reviews, onAddReviewClick} : ReviewProps): JSX.Element {
  const [currentOffsetEnd, setCurrentOffsetEnd] = useState(REVIEW_PER_SHOW);
  let showReviews = reviews.slice();
  showReviews.sort(sortReviewsDate);
  showReviews = showReviews.slice(0, currentOffsetEnd);
  const totalReviews = reviews.length;

  const handleMoreClick = () => {
    setCurrentOffsetEnd(currentOffsetEnd + REVIEW_PER_SHOW);
  };

  return(
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={onAddReviewClick}>Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {showReviews.map((review) => (
            <ReviewCard
              key={review.id.toString()}
              review={review}
            />
          ))}
        </ul>
        {totalReviews >= currentOffsetEnd &&
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button" onClick={handleMoreClick}>Показать больше отзывов</button>
        </div>}
      </div>
    </section>
  );
}

export default Reviews;
