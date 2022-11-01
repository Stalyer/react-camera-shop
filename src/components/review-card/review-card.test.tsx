import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore, makeFakeReview} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import ReviewCard from './review-card';

const history = createMemoryHistory();
const fakeStore = makeFakeStore;
const fakeReview = makeFakeReview();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ReviewCard review={fakeReview} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(new RegExp(fakeReview.userName, 'i'))).toBeInTheDocument();
  });
});
