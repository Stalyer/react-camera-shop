import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Loader from './loader';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Loader />
    </HistoryRouter>
  </Provider>
);

describe('Component: Loader', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getAllByTestId('loader')).toHaveLength(1);
  });
});
