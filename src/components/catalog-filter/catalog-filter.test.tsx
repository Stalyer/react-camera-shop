import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import CatalogFilter from './catalog-filter';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CatalogFilter />
    </HistoryRouter>
  </Provider>
);

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
  });
});
