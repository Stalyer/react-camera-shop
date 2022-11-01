import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Footer />
    </HistoryRouter>
  </Provider>
);

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();
  });
});
