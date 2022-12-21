import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeProduct} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import BasketItemShort from './basket-item-short';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeProduct = makeFakeProduct();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <BasketItemShort product={fakeProduct} />
    </HistoryRouter>
  </Provider>
);

describe('Component: BasketItemShort', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProduct.name, 'i'))).toBeInTheDocument();
  });
});
