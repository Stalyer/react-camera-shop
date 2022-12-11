import BasketItemShort from '../basket-item-short/basket-item-short';

import {Product} from '../../types/product';

type ModalRemoveItemProps = {
  onClose: () => void;
  onRemoveFromCart: () => void;
  product: Product;
};

function ModalRemoveItem({onClose, onRemoveFromCart, product} : ModalRemoveItemProps): JSX.Element {
  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClose}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <BasketItemShort product={product} />
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={onRemoveFromCart}>Удалить</button>
            <button className="btn btn--transparent modal__btn modal__btn--half-width" type="button" onClick={onClose}>Продолжить покупки</button>
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

export default ModalRemoveItem;
