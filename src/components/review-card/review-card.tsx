import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Review} from '../../types/review';
import ProductRating from '../product-rating/product-rating';

type ReviewCardProps = {
  review: Review;
}

dayjs.locale('ru');

function ReviewCard({review} : ReviewCardProps): JSX.Element {
  const {userName, advantage, disadvantage, review: text, rating, createAt: date} = review;
  return(
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={String(date)}>{dayjs(date).format('D MMMM')}</time>
      </div>
      <div className="rate review-card__rate">
        <ProductRating rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{text}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
