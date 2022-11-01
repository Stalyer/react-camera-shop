import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import UpBtn from './up-btn';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <UpBtn />
    </HistoryRouter>
  </Provider>
);

describe('Component: UpBtn', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
