import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ProductRating from './product-rating';
import {RATING_MAX} from '../../const';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductRating rating={RATING_MAX} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ProductRating', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getAllByTestId('rating')).toHaveLength(RATING_MAX);
  });
});
