import {useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCamerasAction, fetchPromoAction} from '../../store/api-actions';
import {getLoadedProductsStatus, getProducts, getProductsTotalCount, getPromo} from '../../store/products-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';
import {QueryParam, PRODUCTS_PER_PAGE} from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const calcOffsetProduts = (currentPageId: number) => (currentPageId - 1) * PRODUCTS_PER_PAGE;

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {pageId} = useParams();
  const isProductsLoaded = useAppSelector(getLoadedProductsStatus);
  const products = useAppSelector(getProducts);
  const productsTotalCount = useAppSelector(getProductsTotalCount);
  const promo = useAppSelector(getPromo);
  const productsStartOffset = calcOffsetProduts(Number(pageId));
  const currentPage = Number(pageId);

  useEffect(() => {
    dispatch(fetchCamerasAction({
      [QueryParam.Start]: productsStartOffset,
      [QueryParam.Limit]: PRODUCTS_PER_PAGE
    }));
  }, [dispatch, productsStartOffset, pageId]);

  const totalPages = useMemo(() => (
    Math.ceil(productsTotalCount / PRODUCTS_PER_PAGE)
  ), [productsTotalCount]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  if (isProductsLoaded) {
    return (
      <>
        Loading...
      </>
    );
  }

  if (currentPage > totalPages || currentPage <= 0) {
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogScreen;
