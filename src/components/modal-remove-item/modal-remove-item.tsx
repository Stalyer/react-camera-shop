import {useAppSelector, useAppDispatch} from '../../hooks';
import {useKeyDown} from '../../hooks/useKeyDown';
import {setModalProduct, removeFromCart} from '../../store/cart-process/cart-process';
import {getModalProduct} from '../../store/cart-process/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';

function ModalRemoveItem(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalProduct = useAppSelector(getModalProduct);

  const handleModalCloseClick = () => {
    dispatch(setModalProduct(null));
  };

  const handleRemoveFromCartClick = () => {
    dispatch(removeFromCart(modalProduct));
    dispatch(setModalProduct(null));
  };

  useKeyDown(['Escape', 'Esc'], handleModalCloseClick);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          {modalProduct &&
          <BasketItemShort product={modalProduct} />}
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveFromCartClick}>Удалить</button>
            <button className="btn btn--transparent modal__btn modal__btn--half-width" type="button" onClick={handleModalCloseClick}>Продолжить покупки</button>
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

export default ModalRemoveItem;
