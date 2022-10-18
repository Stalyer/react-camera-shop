import {useState, useEffect, useMemo} from 'react';
// import {useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCamerasAction, fetchPromoAction} from '../../store/api-actions';
import {getProducts, getProductsTotalCount, getPromo} from '../../store/products-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';
import {QueryParam, PRODUCTS_PER_PAGE} from '../../const';

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const productsTotalCount = useAppSelector(getProductsTotalCount);
  const promo = useAppSelector(getPromo);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsStartOffset, setProductsOffset] = useState(0);
  const productsEndOffset = productsStartOffset + PRODUCTS_PER_PAGE;

  const pageCount = useMemo(() => (
    Math.ceil(productsTotalCount / PRODUCTS_PER_PAGE)
  ), [productsTotalCount]);

  useEffect(() => {
    dispatch(fetchCamerasAction({
      [QueryParam.Start]: productsStartOffset,
      [QueryParam.End]: productsEndOffset
    }));
  }, [dispatch, productsStartOffset, productsEndOffset]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const handlePageLinkClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * PRODUCTS_PER_PAGE) % productsTotalCount;
    setProductsOffset(newOffset);
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <Header />
      <main>
        {promo && <Promo product={promo} />}
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
                    <ProductCard />
                  </div>
                  <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageLinkClick} />
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
