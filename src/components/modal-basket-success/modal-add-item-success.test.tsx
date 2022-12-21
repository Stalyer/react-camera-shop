import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ModalBasketSuccess from './modal-basket-success';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalBasketSuccess />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalBasketSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });
});
