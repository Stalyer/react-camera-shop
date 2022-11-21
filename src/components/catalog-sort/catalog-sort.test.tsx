import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import CatalogSort from './catalog-sort';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CatalogSort />
    </HistoryRouter>
  </Provider>
);

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
