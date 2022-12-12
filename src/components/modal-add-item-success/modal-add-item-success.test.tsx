import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ModalAddItemSuccess from './modal-add-item-success';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalAddItemSuccess />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalAddItemSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });
});
