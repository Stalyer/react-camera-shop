/* eslint-disable @typescript-eslint/no-misused-promises */
import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useKeyDown} from '../../hooks/useKeyDown';
import {ReviewData} from '../../types/review-data';
import {postReviewAction} from '../../store/api-actions';
import {getFormReviewSubmittedStatus} from '../../store/product-process/selectors';

type RateBar = {
  value: number;
  title: string;
}

const rateBar: RateBar[] = [
  {
    value: 5,
    title: 'Отлично'
  },
  {
    value: 4,
    title: 'Хорошо'
  },
  {
    value: 3,
    title: 'Нормально'
  },
  {
    value: 2,
    title: 'Плохо'
  },
  {
    value: 1,
    title: 'Ужасно'
  }
];

type ModalAddReviewProps = {
  onClose: () => void;
  onSubmitSuccess: () => void;
};

function ModalAddReview({onClose, onSubmitSuccess} : ModalAddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {productId} = useParams();
  const isReviewSubmitted = useAppSelector(getFormReviewSubmittedStatus);

  useKeyDown(['Escape', 'Esc'], onClose);

  const {
    register,
    watch,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<ReviewData>({
    mode: 'all',
    defaultValues: {
      cameraId: Number(productId),
      rating: 0
    },
  });

  const currentRating = watch('rating');

  const onSubmit = handleSubmit( async (data) => {
    const response = await dispatch(postReviewAction({
      ...data,
      rating: Number(data.rating),
    }));

    if (response.meta.requestStatus === 'fulfilled') {
      onSubmitSuccess();
    }
  });

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form onSubmit={onSubmit}>
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item${errors.rating ? ' is-invalid' : ''}`}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {rateBar.map(({value, title}) => (
                        <Fragment key={value}>
                          <input
                            className="visually-hidden"
                            id={`star-${value}`}
                            type="radio"
                            value={value}
                            disabled={isReviewSubmitted}
                            {...register('rating', {required: true})}
                          />
                          <label className="rate__label" htmlFor={`star-${value}`} title={title}></label>
                        </Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{currentRating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors.rating &&
                  <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className={`custom-input form-review__item${errors.userName ? ' is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      autoFocus
                      placeholder="Введите ваше имя"
                      disabled={isReviewSubmitted}
                      {...register('userName', {required: true})}
                    />
                  </label>
                  {errors.userName &&
                  <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className={`custom-input form-review__item${errors.advantage ? ' is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Основные преимущества товара"
                      disabled={isReviewSubmitted}
                      {...register('advantage', {required: true})}
                    />
                  </label>
                  {errors.advantage &&
                  <p className="custom-input__error">Нужно указать достоинства</p>}
                </div>
                <div className={`custom-input form-review__item${errors.disadvantage ? ' is-invalid' : ''}`}>
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Главные недостатки товара"
                      disabled={isReviewSubmitted}
                      {...register('disadvantage', {required: true})}
                    />
                  </label>
                  {errors.disadvantage &&
                  <p className="custom-input__error">Нужно указать недостатки</p>}
                </div>
                <div className={`custom-textarea form-review__item${errors.review ? ' is-invalid' : ''}`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      placeholder="Поделитесь своим опытом покупки"
                      disabled={isReviewSubmitted}
                      {...register('review', {required: true, minLength: 5})}
                    >
                    </textarea>
                  </label>
                  {errors.review &&
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>}
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={isReviewSubmitted}
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddReview;
