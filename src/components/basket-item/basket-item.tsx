import {useAppDispatch} from '../../hooks';
import {CartProduct} from '../../types/product';
import {setModalProduct} from '../../store/cart-process/cart-process';

type BasketItemProps = {
  cartProduct: CartProduct;
};

function BasketItem({cartProduct} : BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {product, quantity} = cartProduct;
  const {id, name, vendorCode, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const totalPrice = quantity * price;

  return(
    <li className="basket-item">
      <div className="basket-item__img">
        {previewImg &&
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp},  ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="140"
            height="120"
            alt={name}
          />
        </picture>}
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена: </span>{price.toLocaleString('ru-RU')} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter-${id}`}>{quantity}</label>
        <input type="number" id={`counter-${id}`} value={quantity} min="1" max="99" aria-label="количество товара" />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена: </span>{totalPrice.toLocaleString('ru-RU')} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => dispatch(setModalProduct(product))}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
