import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeProducts} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductSimilar from './product-similar';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeProducts = makeFakeProducts();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductSimilar products={fakeProducts} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProducts[0].name, 'i'))).toBeInTheDocument();
  });
});
