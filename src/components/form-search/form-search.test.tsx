import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeProducts} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import {NameSpace} from '../../const';
import FormSearch from './form-search';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeProducts = makeFakeProducts();

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: [],
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: null,
    foundProducts: fakeProducts,
    productsPriceRange: [],
    isFilterReset: false,
    isFilterActive: false
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <FormSearch />
    </HistoryRouter>
  </Provider>
);

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
  });

  it('should render list correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProducts[0].name, 'i'))).toBeInTheDocument();
  });
});
