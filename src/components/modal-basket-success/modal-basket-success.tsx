import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {useKeyDown} from '../../hooks/useKeyDown';
import {setIsFormOrderFulfilled} from '../../store/cart-process/cart-process';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';

function ModalBasketSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalCloseClick = () => {
    dispatch(setIsFormOrderFulfilled(false));
  };

  const handleModalToCatalogClick = () => {
    dispatch(setIsFormOrderFulfilled(false));
    navigate(`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`);
  };

  useKeyDown(['Escape', 'Esc'], handleModalCloseClick);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleModalToCatalogClick}>Вернуться к покупкам</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalBasketSuccess;
