import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeCartProducts} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import BasketItem from './basket-item';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeCartProducts = makeFakeCartProducts();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <BasketItem cartProduct={fakeCartProducts[0]} />
    </HistoryRouter>
  </Provider>
);

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeCartProducts[0].product.name, 'i'))).toBeInTheDocument();
  });
});
