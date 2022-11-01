import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeProduct} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';
import {AppRoute} from '../../const';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeProduct = makeFakeProduct();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductCard product={fakeProduct} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeProduct.name, 'i'))).toBeInTheDocument();
  });

  it('should redirect to product url when user clicked to link', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Product}/${fakeProduct.id}`}
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={<ProductCard product={fakeProduct} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Подробнее'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
