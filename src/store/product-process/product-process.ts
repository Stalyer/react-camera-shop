import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductProcess} from '../../types/state';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductProcess = {
  product: null,
  isProductLoaded: false,
  similar: [],
  isProductSimilarLoaded: false,
  reviews: [],
  isProductReviewsLoaded: false
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.isProductLoaded = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoaded = false;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.isProductLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      })

      .addCase(fetchCameraSimilarAction.pending, (state) => {
        state.isProductSimilarLoaded = true;
      })
      .addCase(fetchCameraSimilarAction.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.isProductSimilarLoaded = false;
      })
      .addCase(fetchCameraSimilarAction.rejected, (state) => {
        state.isProductSimilarLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      })

      .addCase(fetchCameraReviewsAction.pending, (state) => {
        state.isProductReviewsLoaded = true;
      })
      .addCase(fetchCameraReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isProductReviewsLoaded = false;
      })
      .addCase(fetchCameraReviewsAction.rejected, (state) => {
        state.isProductReviewsLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      });
  }
});
