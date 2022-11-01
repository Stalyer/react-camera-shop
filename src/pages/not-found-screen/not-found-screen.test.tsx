import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <NotFoundScreen />
    </HistoryRouter>
  </Provider>
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
