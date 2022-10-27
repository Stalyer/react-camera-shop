import {useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import browserHistory from '../../browser-history';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction} from '../../store/api-actions';
import {getProduct, getLoadedProductStatus, getProductSimilar, getProductReviews} from '../../store/product-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductSimilar from '../../components/product-similar/product-similar';
import Reviews from '../../components/reviews/reviews';
import ProductRating from '../../components/product-rating/product-rating';
import {TabType} from '../../const';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {productId} = useParams();
  const isProductLoaded = useAppSelector(getLoadedProductStatus);
  const product = useAppSelector(getProduct);
  const productSimilar = useAppSelector(getProductSimilar);
  const productReviews = useAppSelector(getProductReviews);
  const {hash} = useLocation();
  const currentTabs = hash ? hash : TabType.Description;

  useEffect(() => {
    dispatch(fetchCameraAction(Number(productId)));
    dispatch(fetchCameraSimilarAction(Number(productId)));
    dispatch(fetchCameraReviewsAction(Number(productId)));
  }, [productId, dispatch]);

  if (isProductLoaded) {
    return (
      <>
        Loading...
      </>
    );
  }

  if (!product) {
    return (
      <>
        Not Found
      </>
    );
  }

  const {name, vendorCode, type, category, description, level, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = product;

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  {previewImg &&
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${previewImgWebp},  ${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={previewImg}
                      srcSet={`${previewImg2x} 2x`}
                      width="560"
                      height="480"
                      alt={name}
                    />
                  </picture>}
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <ProductRating rating={rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button
                        className={`tabs__control${currentTabs === TabType.Сharacteristics ? ' is-active' : ''}`}
                        type="button"
                        onClick={() => browserHistory.replace({hash: TabType.Сharacteristics})}
                      >
                        Характеристики
                      </button>
                      <button
                        className={`tabs__control${currentTabs === TabType.Description ? ' is-active' : ''}`}
                        type="button"
                        onClick={() => browserHistory.replace({hash: TabType.Description})}
                      >
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element${currentTabs === TabType.Сharacteristics ? ' is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={`tabs__element${currentTabs === TabType.Description ? ' is-active' : ''}`}>
                        <div className="product__tabs-text">
                          {description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {productSimilar &&
          <div className="page-content__section">
            <ProductSimilar products={productSimilar} />
          </div>}
          {productReviews &&
          <div className="page-content__section">
            <Reviews reviews={productReviews} />
          </div>}
        </div>
      </main>
      <UpBtn />
      <Footer />
    </>
  );
}

export default ProductScreen;
