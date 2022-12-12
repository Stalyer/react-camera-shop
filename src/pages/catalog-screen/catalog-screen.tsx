import {useEffect, useMemo} from 'react';
import {useParams, useSearchParams, useNavigate, useLocation} from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCamerasAction, fetchPriceCamerasAction, fetchPromoAction} from '../../store/api-actions';
import {getLoadedProductsStatus, getProducts, getProductsTotalCount, getPromo, getIsFilterActive} from '../../store/products-process/selectors';
import {changeIsFilterActive} from '../../store/products-process/products-process';
import {getModalProduct, getIsAddToCartSuccess} from '../../store/cart-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item-success';
import {QueryParam, SortType, SortOrder, PRODUCTS_PER_PAGE, AppRoute} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loader from '../../components/loader/loader';

const calcOffsetProduts = (currentPageId: number) => (currentPageId - 1) * PRODUCTS_PER_PAGE;

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {pageId} = useParams();
  const [searchParams] = useSearchParams();
  const isProductsLoaded = useAppSelector(getLoadedProductsStatus);
  const isFilterActive = useAppSelector(getIsFilterActive);
  const products = useAppSelector(getProducts);
  const productsTotalCount = useAppSelector(getProductsTotalCount);
  const promo = useAppSelector(getPromo);
  const modalProduct = useAppSelector(getModalProduct);
  const isAddToCartSuccess = useAppSelector(getIsAddToCartSuccess);
  const productsStartOffset = calcOffsetProduts(Number(pageId));
  const currentPage = Number(pageId);

  if (isFilterActive) {
    if (currentPage > 1) {
      navigate(`${AppRoute.Catalog}/page-1${location.search}`, {replace: true});
    }
    dispatch(changeIsFilterActive(false));
  }

  useEffect(() => {
    dispatch(fetchPriceCamerasAction({
      [QueryParam.Sort]: SortType.Price,
      [QueryParam.Order]: SortOrder.Asc,
      [QueryParam.Category]: searchParams.getAll(QueryParam.Category),
      [QueryParam.Type]: searchParams.getAll(QueryParam.Type),
      [QueryParam.Level]: searchParams.getAll(QueryParam.Level)
    }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(fetchCamerasAction({
      [QueryParam.Start]: productsStartOffset,
      [QueryParam.Limit]: PRODUCTS_PER_PAGE,
      [QueryParam.Sort]: searchParams.get(QueryParam.Sort),
      [QueryParam.Order]: searchParams.get(QueryParam.Order),
      [QueryParam.Category]: searchParams.getAll(QueryParam.Category),
      [QueryParam.Type]: searchParams.getAll(QueryParam.Type),
      [QueryParam.Level]: searchParams.getAll(QueryParam.Level),
      [QueryParam.PriceMin]: searchParams.get(QueryParam.PriceMin),
      [QueryParam.PriceMax]: searchParams.get(QueryParam.PriceMax)
    }));
  }, [dispatch, productsStartOffset, pageId, searchParams]);

  const totalPages = useMemo(() => (
    Math.ceil(productsTotalCount / PRODUCTS_PER_PAGE)
  ), [productsTotalCount]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if ((currentPage > totalPages || currentPage < 1) && totalPages !== 0) {
    return (
      <NotFoundScreen />
    );
  }

  return (
    <>
      <Header />
      <main>
        {promo &&
        <Promo product={promo} />}
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  {products.length > 0 && !isProductsLoaded &&
                    <>
                      <CatalogSort />
                      <div className="cards catalog__cards">
                        {products.map((product) => (
                          <ProductCard
                            key={product.id.toString()}
                            product={product}
                          />
                        ))}
                      </div>
                      <Pagination currentPage={currentPage} totalPages={totalPages} />
                    </>}
                  {!products.length && !isProductsLoaded &&
                    <p>По вашему запросу ничего не найдено</p>}
                </div>
              </div>
            </div>
          </section>
        </div>

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

      {isProductsLoaded &&
      <Loader />}
    </>
  );
}

export default CatalogScreen;
