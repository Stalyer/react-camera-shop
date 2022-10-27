import {useState} from 'react';
import ReviewCard from '../review-card/review-card';
import {Review} from '../../types/review';
import {REVIEW_PER_SHOW} from '../../const';

type ReviewProps = {
  reviews: Review[];
}

function Reviews({reviews} : ReviewProps): JSX.Element {
  const [currentOffsetEnd, setCurrentOffsetEnd] = useState(REVIEW_PER_SHOW);
  const showReviews = reviews.slice(0, currentOffsetEnd);
  const totalReviews = reviews.length;

  const handleMoreClick = () => {
    setCurrentOffsetEnd(currentOffsetEnd + REVIEW_PER_SHOW);
  };

  return(
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
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
