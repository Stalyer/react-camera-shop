import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchCamerasAction, fetchPromoAction} from '../../store/api-actions';
import {getProducts, getPromo} from '../../store/products-process/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Promo from '../../components/promo/promo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';

function CatalogScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const promo = useAppSelector(getPromo);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

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
                  <Pagination />
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
