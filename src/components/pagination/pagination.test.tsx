import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Pagination currentPage={1} totalPages={5} />
    </HistoryRouter>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
