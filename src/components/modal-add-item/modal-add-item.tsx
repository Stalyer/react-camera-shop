import {useAppSelector, useAppDispatch} from '../../hooks';
import {useKeyDown} from '../../hooks/useKeyDown';
import {setModalProduct, addToCart} from '../../store/cart-process/cart-process';
import {getModalProduct} from '../../store/cart-process/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';

function ModalAddItem(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalProduct = useAppSelector(getModalProduct);

  const handleModalCloseClick = () => {
    dispatch(setModalProduct(null));
  };

  const handleAddToCartClick = () => {
    dispatch(addToCart(modalProduct));
    dispatch(setModalProduct(null));
  };

  useKeyDown(['Escape', 'Esc'], handleModalCloseClick);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleModalCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          {modalProduct &&
          <BasketItemShort product={modalProduct} />}
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleAddToCartClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
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

export default ModalAddItem;
