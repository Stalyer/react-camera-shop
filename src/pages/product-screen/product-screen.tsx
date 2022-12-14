import {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import browserHistory from '../../browser-history';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction} from '../../store/api-actions';
import {getProduct, getLoadedProductStatus, getProductSimilar, getProductReviews} from '../../store/product-process/selectors';
import {setModalProduct} from '../../store/cart-process/cart-process';
import {getModalProduct, getIsAddToCartSuccess} from '../../store/cart-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductSimilar from '../../components/product-similar/product-similar';
import Reviews from '../../components/reviews/reviews';
import ProductRating from '../../components/product-rating/product-rating';
import ModalAddReview from '../../components/modal-add-review/modal-add-review';
import ModalAddReviewSuccess from '../../components/modal-add-review-success/modal-add-review-success';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item-success';
import {TabType} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loader from '../../components/loader/loader';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {productId} = useParams();
  const isProductLoaded = useAppSelector(getLoadedProductStatus);
  const product = useAppSelector(getProduct);
  const productSimilar = useAppSelector(getProductSimilar);
  const productReviews = useAppSelector(getProductReviews);
  const modalProduct = useAppSelector(getModalProduct);
  const isAddToCartSuccess = useAppSelector(getIsAddToCartSuccess);
  const {hash} = useLocation();
  const currentTabs = hash ? hash : TabType.Description;
  const [isModalReviewActive, setIsModalReviewActive] = useState(false);
  const [isModalReviewSuccessActive, setIsModalReviewSuccessActive] = useState(false);

  const handleSumbitSuccess = () => {
    setIsModalReviewActive(false);
    setIsModalReviewSuccessActive(true);
  };

  useEffect(() => {
    dispatch(fetchCameraAction(Number(productId)));
    dispatch(fetchCameraSimilarAction(Number(productId)));
    dispatch(fetchCameraReviewsAction(Number(productId)));
  }, [productId, dispatch]);

  if (isProductLoaded) {
    return (
      <Loader />
    );
  }

  if (!product) {
    return (
      <NotFoundScreen />
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
                    <p className="visually-hidden">??????????????: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">?????????? ????????????:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">????????:</span>{price.toLocaleString('ru-RU')} ???</p>
                  <button className="btn btn--purple" type="button" onClick={() => dispatch(setModalProduct(product))}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    ???????????????? ?? ??????????????
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button
                        className={`tabs__control${currentTabs === TabType.Characteristics ? ' is-active' : ''}`}
                        type="button"
                        onClick={() => browserHistory.replace({hash: TabType.Characteristics})}
                      >
                        ????????????????????????????
                      </button>
                      <button
                        className={`tabs__control${currentTabs === TabType.Description ? ' is-active' : ''}`}
                        type="button"
                        onClick={() => browserHistory.replace({hash: TabType.Description})}
                      >
                        ????????????????
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className={`tabs__element${currentTabs === TabType.Characteristics ? ' is-active' : ''}`}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">??????????????:</span>
                            <p className="item-list__text">{vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">??????????????????:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">?????? ????????????:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">??????????????:</span>
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
            <Reviews reviews={productReviews} onAddReviewClick={() => setIsModalReviewActive(true)} />
          </div>}
        </div>
        <UpBtn />

        {isModalReviewActive &&
        <FocusLock>
          <RemoveScroll>
            <ModalAddReview onClose={() => setIsModalReviewActive(false)} onSubmitSuccess={handleSumbitSuccess} />
          </RemoveScroll>
        </FocusLock>}

        {isModalReviewSuccessActive &&
        <FocusLock>
          <RemoveScroll>
            <ModalAddReviewSuccess onClose={() => setIsModalReviewSuccessActive(false)} />
          </RemoveScroll>
        </FocusLock>}

        {modalProduct &&
        <FocusLock>
          <RemoveScroll>
            <ModalAddItem />
          </RemoveScroll>
        </FocusLock>}

        {isAddToCartSuccess &&
        <FocusLock>
          <RemoveScroll>
            <ModalAddItemSuccess />
          </RemoveScroll>
        </FocusLock>}
      </main>
      <Footer />
    </>
  );
}

export default ProductScreen;
