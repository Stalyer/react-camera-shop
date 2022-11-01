import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeReviews} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import Reviews from './reviews';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeReviews = makeFakeReviews();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Reviews reviews={fakeReviews} onAddReviewClick={jest.fn()} />
    </HistoryRouter>
  </Provider>
);

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeReviews[0].userName, 'i'))).toBeInTheDocument();
  });
});
