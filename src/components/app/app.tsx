import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
// import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Catalog}
        element={<CatalogScreen />}
      />
      {/* <Route
        path="*"
        element={<NotFoundScreen />}
      /> */}
    </Routes>
  );
}

export default App;
