import BasketItemShort from '../basket-item-short/basket-item-short';

function ModalRemoveItem(): JSX.Element {
  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <BasketItemShort />
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button">Удалить</button>
            <button className="btn btn--transparent modal__btn modal__btn--half-width" type="button">Продолжить покупки</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
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
