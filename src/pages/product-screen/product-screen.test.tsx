import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeProduct, makeFakeProducts, makeFakePromoProduct, makeFakeReviews} from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import {NameSpace} from '../../const';
import ProductScreen from './product-screen';

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
    promo: fakePromoProduct,
    foundProducts: [],
    productsPriceRange: {
      minPrice: 0,
      maxPrice: 0
    }
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
      <ProductScreen />
    </HistoryRouter>
  </Provider>
);

describe('Component: ProductScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProduct.name, 'i'))).toBeInTheDocument();
  });
});
