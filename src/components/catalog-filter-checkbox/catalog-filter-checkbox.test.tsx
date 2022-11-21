import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import CatalogFilterCheckbox from './catalog-filter-checkbox';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CatalogFilterCheckbox />
    </HistoryRouter>
  </Provider>
);

describe('Component: CatalogFilterCheckbox', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
