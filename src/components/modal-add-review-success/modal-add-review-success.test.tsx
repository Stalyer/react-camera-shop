import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ModalAddReviewSuccess from './modal-add-review-success';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ModalAddReviewSuccess onClose={jest.fn()} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ModalAddReviewSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
