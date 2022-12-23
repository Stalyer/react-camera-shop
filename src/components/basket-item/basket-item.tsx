import {ChangeEvent} from 'react';
import {useState, useEffect} from 'react';
import {useAppDispatch} from '../../hooks';
import {CartProduct} from '../../types/product';
import {setModalProduct, setQuantityProduct} from '../../store/cart-process/cart-process';
import {CART_SINGLE_PRODUCT_MAX, CART_SINGLE_PRODUCT_MIN, CHANGE_DELAY} from '../../const';

type BasketItemProps = {
  cartProduct: CartProduct;
};

function BasketItem({cartProduct} : BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {product, quantity} = cartProduct;
  const {id, name, vendorCode, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const totalPrice = quantity * price;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isUpdateInputQuantity, setIsUpdateInputQuantity] = useState(false);

  useEffect(() => {
    if (!isUpdateInputQuantity) {
      dispatch(setQuantityProduct({
        product: product,
        quantity: currentQuantity
      }));
    }
  }, [isUpdateInputQuantity, currentQuantity, product, dispatch]);

  useEffect(() => {
    const changeQuantity = setTimeout(() => {
      if (isUpdateInputQuantity) {
        if (currentQuantity < CART_SINGLE_PRODUCT_MIN) {
          setCurrentQuantity(CART_SINGLE_PRODUCT_MIN);
        }

        if (currentQuantity > CART_SINGLE_PRODUCT_MAX) {
          setCurrentQuantity(CART_SINGLE_PRODUCT_MAX);
        }

        setIsUpdateInputQuantity(false);
      }
    }, CHANGE_DELAY);

    return () => clearTimeout(changeQuantity);
  }, [isUpdateInputQuantity, currentQuantity]);

  const handleQuantityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    setCurrentQuantity(value);
    setIsUpdateInputQuantity(true);
  };

  const handleDecreaseQuantityClick = () => {
    setCurrentQuantity(currentQuantity - 1);
    setIsUpdateInputQuantity(false);
  };

  const handleIncreaseQuantityClick = () => {
    setCurrentQuantity(currentQuantity + 1);
    setIsUpdateInputQuantity(false);
  };

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
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecreaseQuantityClick}
          disabled={currentQuantity <= CART_SINGLE_PRODUCT_MIN}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter-${id}`}>{quantity}</label>
        <input
          type="number"
          id={`counter-${id}`}
          value={currentQuantity ? currentQuantity : ''}
          min={CART_SINGLE_PRODUCT_MIN}
          max={CART_SINGLE_PRODUCT_MAX}
          aria-label="количество товара"
          onChange={handleQuantityChange}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseQuantityClick}
          disabled={currentQuantity >= CART_SINGLE_PRODUCT_MAX}
        >
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
