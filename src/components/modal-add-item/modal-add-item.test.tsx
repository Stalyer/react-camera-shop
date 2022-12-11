import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeProduct} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ModalAddItem from './modal-add-item';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeProduct = makeFakeProduct();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalAddItem onClose={jest.fn()} onAddToCart={jest.fn()} product={fakeProduct} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalAddItem', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
