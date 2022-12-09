import {Link, useMatch} from 'react-router-dom';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';
import {useAppSelector} from '../../hooks';
import {getProduct} from '../../store/product-process/selectors';

function Breadcrumbs(): JSX.Element {
  const isCatalogRoute = useMatch(`${AppRoute.Catalog}/page-:pageId`) !== null;
  const isProductRoute = useMatch(`${AppRoute.Product}/:productId`) !== null;
  const isCartRoute = useMatch(AppRoute.Cart) !== null;
  const product = useAppSelector(getProduct);

  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Root}>
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {isCatalogRoute &&
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
          </li>}
          {(isProductRoute || isCartRoute) &&
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`}>
              Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>}
          {isProductRoute &&
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">{product?.name}</span>
          </li>}
          {isCartRoute &&
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
          </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
