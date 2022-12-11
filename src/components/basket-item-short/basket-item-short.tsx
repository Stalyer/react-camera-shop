import {useMatch} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Product} from '../../types/product';

type BasketItemShortProps = {
  product: Product;
};

function BasketItemShort({product} : BasketItemShortProps): JSX.Element {
  const {name, vendorCode, category, level, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = product;
  const isCartRoute = useMatch(AppRoute.Cart) !== null;

  return(
    <div className="basket-item basket-item--short">
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
        {!isCartRoute &&
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>}
      </div>
    </div>
  );
}

export default BasketItemShort;
