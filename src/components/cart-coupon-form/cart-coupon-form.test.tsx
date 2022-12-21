import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeCartProducts} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import CartCouponForm from './cart-coupon-form';
import {NameSpace} from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeCartProducts = makeFakeCartProducts();

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: [],
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: null,
    foundProducts: [],
    productsPriceRange: [],
    isFilterReset: false,
    isFilterActive: false
  },
  [NameSpace.Product]: {
    product: null,
    isProductLoaded: false,
    similar: [],
    reviews: [],
    isFormReviewSubmitted: false
  },
  [NameSpace.Cart]: {
    products: fakeCartProducts,
    modalProduct: null,
    isAddSuccess: false,
    isFormOrderPending: false,
    isFormOrderFulfilled: false,
    coupon: null,
    discount: 0
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CartCouponForm />
    </HistoryRouter>
  </Provider>
);

describe('Component: CartCouponForm', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Промокод принят!/i)).toBeInTheDocument();
  });
});
