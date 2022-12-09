import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import CartScreen from '../../pages/cart-screen/cart-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainScreen />}
      />
      <Route
        path={`${AppRoute.Catalog}/page-:pageId`}
        element={<CatalogScreen />}
      />
      <Route
        path={`${AppRoute.Product}/:productId`}
        element={<ProductScreen />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartScreen />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
