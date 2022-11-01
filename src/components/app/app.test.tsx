import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeProduct, makeFakeProducts, makeFakePromoProduct, makeFakeReviews} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import {NameSpace, AppRoute, DEFAULT_ID_PAGE} from '../../const';
import App from './app';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeProducts = makeFakeProducts();
const fakeProduct = makeFakeProduct();
const fakePromoProduct = makeFakePromoProduct();
const fakeReviews = makeFakeReviews();

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: fakeProducts,
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: fakePromoProduct ,
  },
  [NameSpace.Product]: {
    product: fakeProduct,
    isProductLoaded: false,
    similar: fakeProducts,
    reviews: fakeReviews,
    isFormReviewSubmitted: false
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Главная страница в разработке/i)).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog"', () => {
    history.push(`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductScreen" when user navigate to "/product"', () => {
    history.push(`${AppRoute.Product}/${fakeProduct.id}`);

    render(fakeApp);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
