import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {setModalProduct} from '../../store/cart-process/cart-process';
import {getCartProducts} from '../../store/cart-process/selectors';
import {AppRoute} from '../../const';
import {Product} from '../../types/product';
import ProductRating from '../product-rating/product-rating';

type ProductCardProps = {
  product: Product;
  isActive?: boolean;
}

function ProductCard({product, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const cartFoundItem = cartProducts.find((item) => item.product.id === product.id);
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = product;

  return(
    <div className={`product-card${isActive ? ' is-active' : ''}`}>
      <div className="product-card__img">
        {previewImg &&
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp},  ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="280"
            height="240"
            alt={name}
          />
        </picture>}
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <ProductRating rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
      </div>
      <div className="product-card__buttons">
        {!cartFoundItem &&
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => dispatch(setModalProduct(product))}>Купить</button>}
        {cartFoundItem &&
        <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          В корзине
        </Link>}
        <Link to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
