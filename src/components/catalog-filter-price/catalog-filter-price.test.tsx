import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {NameSpace} from '../../const';
import CatalogFilterPrice from './catalog-filter-price';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: [],
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: null,
    foundProducts: [],
    productsPriceRange: [2000, 10000],
    isFilterReset: false,
    isFilterActive: false
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CatalogFilterPrice />
    </HistoryRouter>
  </Provider>
);

describe('Component: CatalogFilterPrice', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });

  it('should correctly input to price min', async () => {
    render(fakeApp);

    await userEvent.type(screen.getByTestId('input-price-min'), '2000');

    expect(screen.getByTestId('input-price-min')).toHaveValue(2000);
  });

  it('should correctly input to price max', async () => {
    render(fakeApp);

    await userEvent.type(screen.getByTestId('input-price-max'), '10000');

    expect(screen.getByTestId('input-price-max')).toHaveValue(10000);
  });
});
