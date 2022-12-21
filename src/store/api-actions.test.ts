import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchCamerasAction, fetchPriceCamerasAction, fetchSearchCamerasAction, fetchPromoAction, fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction, postCouponAction, postOrderAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {ReviewData} from '../types/review-data';
import {CouponData} from '../types/coupon-data';
import {OrderData} from '../types/order-data';
import {makeFakeProduct, makeFakeProducts, makeFakePromoProduct, makeFakeReview, makeFakeReviews} from '../utils/mocks';

const fakeProducts = makeFakeProducts();
const fakeProduct = makeFakeProduct();
const fakePromoProduct = makeFakePromoProduct();
const fakeReview = makeFakeReview();
const fakeReviews = makeFakeReviews();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeProducts, {'x-total-count': 1 });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPriceCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeProducts);

    const store = mockStore();

    await store.dispatch(fetchPriceCamerasAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchPriceCamerasAction.pending.type,
      fetchPriceCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSearchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeProducts);

    const store = mockStore();

    await store.dispatch(fetchSearchCamerasAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchSearchCamerasAction.pending.type,
      fetchSearchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakePromoProduct);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCameraAction when GET /cameras', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeProduct.id}`)
      .reply(200, fakeProduct);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(fakeProduct.id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCameraReviewsAction when GET /cameras', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeProduct.id}/reviews`)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchCameraReviewsAction(fakeProduct.id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCameraReviewsAction.pending.type,
      fetchCameraReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCameraSimilarAction when GET /cameras', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeProduct.id}/similar`)
      .reply(200, fakeProducts);

    const store = mockStore();

    await store.dispatch(fetchCameraSimilarAction(fakeProduct.id));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCameraSimilarAction.pending.type,
      fetchCameraSimilarAction.fulfilled.type
    ]);
  });


  it('should dispatch postReviewAction when POST /reviews', async () => {
    const fakeAddedReview: ReviewData = {
      cameraId: fakeProduct.id,
      userName: 'test',
      advantage: 'test',
      disadvantage: 'test',
      review: 'test',
      rating: 5
    };

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, fakeReview);

    const store = mockStore();

    await store.dispatch(postReviewAction(fakeAddedReview));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch postCouponAction when POST /coupons', async () => {
    const fakeAddedCoupon: CouponData = {
      coupon: 'test'
    };

    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(200, 10);

    const store = mockStore();

    await store.dispatch(postCouponAction(fakeAddedCoupon));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postCouponAction.pending.type,
      postCouponAction.fulfilled.type
    ]);
  });

  it('should dispatch postOrderAction when POST /orders', async () => {
    const fakeAddedOrder: OrderData = {
      camerasIds: [1, 2],
      coupon: 'test'
    };

    mockAPI
      .onPost(APIRoute.Orders)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postOrderAction(fakeAddedOrder));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postOrderAction.pending.type,
      postOrderAction.fulfilled.type
    ]);
  });

});
