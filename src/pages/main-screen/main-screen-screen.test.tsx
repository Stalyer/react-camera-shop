import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import MainScreen from './main-screen';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <MainScreen />
    </HistoryRouter>
  </Provider>
);

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Главная страница в разработке/i)).toBeInTheDocument();
  });
});
