import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductProcess} from '../../types/state';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductProcess = {
  product: null,
  isProductLoaded: false,
  similar: [],
  isProductSimilarLoaded: false,
  reviews: [],
  isProductReviewsLoaded: false,
  isFormReviewSubmitted: false
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
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
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
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
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
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      })

      .addCase(postReviewAction.pending, (state) => {
        state.isFormReviewSubmitted = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isFormReviewSubmitted = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isFormReviewSubmitted = false;
        toast('При отправке возникла ошибка, попробуйте позже');
      });
  }
});
