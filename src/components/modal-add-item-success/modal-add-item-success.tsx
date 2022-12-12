import {useAppDispatch} from '../../hooks';
import {Link, useMatch} from 'react-router-dom';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';
import {useKeyDown} from '../../hooks/useKeyDown';
import {setIsAddCartSuccess} from '../../store/cart-process/cart-process';

function ModalAddItemSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCatalogRoute = useMatch(`${AppRoute.Catalog}/page-:pageId`) !== null;
  const isProductRoute = useMatch(`${AppRoute.Product}/:productId`) !== null;

  const handleModalCloseClick = () => {
    dispatch(setIsAddCartSuccess(false));
  };

  useKeyDown(['Escape', 'Esc'], handleModalCloseClick);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            {isCatalogRoute &&
            <button type="button" className="btn btn--transparent modal__btn" onClick={handleModalCloseClick}>Продолжить покупки</button>}
            {isProductRoute &&
            <Link className="btn btn--transparent modal__btn" to={`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`} onClick={handleModalCloseClick}>Продолжить покупки</Link>}
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Cart} onClick={handleModalCloseClick}>Перейти в корзину</Link>
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

export default ModalAddItemSuccess;
