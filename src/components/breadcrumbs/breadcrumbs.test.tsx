import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeProduct, makeFakeProducts} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import {NameSpace, AppRoute, DEFAULT_ID_PAGE} from '../../const';
import Breadcrumbs from './breadcrumbs';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeProducts = makeFakeProducts();
const fakeProduct = makeFakeProduct();

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: fakeProducts,
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: null,
    foundProducts: [],
    productsPriceRange: {
      minPrice: 0,
      maxPrice: 0
    }
  },
  [NameSpace.Product]: {
    product: fakeProduct,
    isProductLoaded: false,
    similar: [],
    reviews: [],
    isFormReviewSubmitted: false
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Breadcrumbs />
    </HistoryRouter>
  </Provider>
);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render correctly on page "CatalogScreen"', () => {
    history.push(`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`);

    render(fakeApp);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render correctly on page "ProductScreen"', () => {
    history.push(`${AppRoute.Product}/${fakeProduct.id}`);

    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProduct.name, 'i'))).toBeInTheDocument();
  });
});
