import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductProcess} from '../../types/state';
import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductProcess = {
  product: null,
  isProductLoaded: false,
  similar: [],
  reviews: [],
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

      .addCase(fetchCameraSimilarAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(fetchCameraSimilarAction.rejected, () => {
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      })

      .addCase(fetchCameraReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchCameraReviewsAction.rejected, () => {
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
