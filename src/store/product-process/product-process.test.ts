import {productProcess} from './product-process';
import {ProductProcess} from '../../types/state';
import {makeFakeProduct, makeFakeProducts, makeFakeReview, makeFakeReviews} from '../../utils/mocks';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction} from '../api-actions';

const fakeProducts = makeFakeProducts();
const fakeProduct = makeFakeProduct();
const fakeReview = makeFakeReview();
const fakeReviews = makeFakeReviews();

describe('Reducer: product', () => {
  let state: ProductProcess;

  beforeEach(() => {
    state = {
      product: null,
      isProductLoaded: false,
      similar: [],
      reviews: [],
      isFormReviewSubmitted: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(productProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        product: null,
        isProductLoaded: false,
        similar: [],
        reviews: [],
        isFormReviewSubmitted: false
      });
  });

  describe('fetchCameraAction test', () => {
    it('should change status isProductLoaded while waiting for product to load', () => {
      expect(productProcess.reducer(state, {type: fetchCameraAction.pending.type}))
        .toEqual({...state, isProductLoaded: true});
    });
    it('should update product', () => {
      expect(productProcess.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: fakeProduct}))
        .toEqual({...state, product: fakeProduct});
    });
    it('should change status isProductLoaded on error', () => {
      expect(productProcess.reducer(state, {type: fetchCameraAction.rejected.type}))
        .toEqual({...state, isProductLoaded: false});
    });
  });

  describe('fetchCameraSimilarAction test', () => {
    it('should update similar', () => {
      expect(productProcess.reducer(state, {type: fetchCameraSimilarAction.fulfilled.type, payload: fakeProducts}))
        .toEqual({...state, similar: fakeProducts});
    });
  });

  describe('fetchCameraReviewsAction test', () => {
    it('should update reviews', () => {
      expect(productProcess.reducer(state, {type: fetchCameraReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviews: fakeReviews});
    });
  });

  describe('postReviewAction test', () => {
    it('should change status isFormReviewSubmitted while waiting for review to post', () => {
      expect(productProcess.reducer(state, {type: postReviewAction.pending.type}))
        .toEqual({...state, isFormReviewSubmitted: true});
    });
    it('should update reviews', () => {
      expect(productProcess.reducer(state, {type: postReviewAction.fulfilled.type, payload: fakeReview}))
        .toEqual({...state, reviews: [fakeReview]});
    });
    it('should change status isFormReviewSubmitted on error', () => {
      expect(productProcess.reducer(state, {type: postReviewAction.rejected.type}))
        .toEqual({...state, isFormReviewSubmitted: false});
    });
  });
});
