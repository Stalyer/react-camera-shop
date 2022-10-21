import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Product} from '../../types/product';
import ProductRating from '../product-rating/product-rating';

type ProductCardProps = {
  product: Product;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
  const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = product;

  return(
    //  product-card is-active
    <div className="product-card">
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
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <Link to={`${AppRoute.Product}/${id}`}>Подробнее</Link>
      </div>
    </div>
  );
}

export default ProductCard;
