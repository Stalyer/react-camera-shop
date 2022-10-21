import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCameraAction} from '../../store/api-actions';
import {getProduct, getLoadedProductStatus} from '../../store/product-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import UpBtn from '../../components/up-btn/up-btn';
import ProductSimilar from '../../components/product-similar/product-similar';
import Review from '../../components/review/review';

function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {productId} = useParams();
  const isProductLoaded = useAppSelector(getLoadedProductStatus);
  const product = useAppSelector(getProduct);

  useEffect(() => {
    dispatch(fetchCameraAction(Number(productId)));
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

  // const {id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = product;

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
                  <picture>
                    <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x" />
                    <img
                      src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="560" height="480"
                      alt="Ретрокамера Das Auge IV"
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">Ретрокамера «Das Auge IV»</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>73 450 ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">Характеристики</button>
                      <button className="tabs__control is-active" type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> DA4IU67AD5</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">Видеокамера</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">Коллекционная</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">Любительский</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>Немецкий концерн BRW разработал видеокамеру Das Auge IV в&nbsp;начале 80-х годов, однако она
                            до&nbsp;сих пор пользуется популярностью среди коллекционеров и&nbsp;яростных почитателей
                            старинной техники.
                          </p>
                          <p>Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот
                            чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам всех
                            престижных кинофестивалей.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="page-content__section">
            <ProductSimilar />
          </div>
          <div className="page-content__section">
            <Review />
          </div>
        </div>
      </main>
      <UpBtn />
      <Footer />
    </>
  );
}

export default ProductScreen;
