import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
