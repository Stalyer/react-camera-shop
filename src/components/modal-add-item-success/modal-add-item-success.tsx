import {Link, useMatch} from 'react-router-dom';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';
import {useKeyDown} from '../../hooks/useKeyDown';

type ModalAddItemSuccessProps = {
  onClose: () => void;
};

function ModalAddItemSuccess({onClose} : ModalAddItemSuccessProps): JSX.Element {
  useKeyDown(['Escape', 'Esc'], onClose);
  const isCatalogRoute = useMatch(`${AppRoute.Catalog}/page-:pageId`) !== null;
  const isProductRoute = useMatch(`${AppRoute.Product}/:productId`) !== null;

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            {isCatalogRoute &&
            <button type="button" className="btn btn--transparent modal__btn" onClick={onClose}>Продолжить покупки</button>}
            {isProductRoute &&
            <Link className="btn btn--transparent modal__btn" to={`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`}>Продолжить покупки</Link>}
            <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Cart}>Перейти в корзину</Link>
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

export default ModalAddItemSuccess;
