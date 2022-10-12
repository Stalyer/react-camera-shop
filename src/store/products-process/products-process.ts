import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductsProcess} from '../../types/state';
import {fetchCamerasAction, fetchPromoAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductsProcess = {
  products: [],
  promo: null,
  isDataLoaded: false
};

export const productsProcess = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isDataLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      });
  }
});
