import BasketItemShort from '../basket-item-short/basket-item-short';
import {useKeyDown} from '../../hooks/useKeyDown';
import {Product} from '../../types/product';

type ModalAddItemProps = {
  onClose: () => void;
  onAddToCart: () => void;
  product: Product;
};

function ModalAddItem({onClose, onAddToCart, product} : ModalAddItemProps): JSX.Element {
  useKeyDown(['Escape', 'Esc'], onClose);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <BasketItemShort product={product} />
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onAddToCart}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
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

export default ModalAddItem;
