import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakePromoProduct} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Promo from './promo';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakePromoProduct = makeFakePromoProduct();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Promo product={fakePromoProduct} />
    </HistoryRouter>
  </Provider>
);

describe('Component: Promo', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakePromoProduct.name, 'i'))).toBeInTheDocument();
  });
});
