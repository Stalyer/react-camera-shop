import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {NameSpace} from '../../const';
import ModalAddReview from './modal-add-review';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);

const fakeStore = mockStore({
  [NameSpace.Products]: {
    products: [],
    isProductsLoaded: false,
    productsTotalCount: 1,
    promo: null,
    foundProducts: [],
    productsPriceRange: {
      minPrice: 0,
      maxPrice: 0
    }
  },
  [NameSpace.Product]: {
    product: null,
    isProductLoaded: false,
    similar: [],
    reviews: [],
    isFormReviewSubmitted: false
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalAddReview onSubmitSuccess={jest.fn()} onClose={jest.fn()} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalAddReview', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should dispatch action postReviewAction when auth user click on button', async () => {
    render(fakeApp);

    await userEvent.click(screen.getByTitle(/Хорошо/i));
    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'Lorem ipsum');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'Lorem ipsum dolor sit amet.');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    await userEvent.click(screen.getByText('Отправить отзыв'));

    const actions = fakeStore.getActions();

    expect(actions[0].type).toBe('dataProduct/postReview/pending');
  });
});
