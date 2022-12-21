import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ModalRemoveItem from './modal-remove-item';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalRemoveItem />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalRemoveItem', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
