import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductsProcess} from '../../types/state';
import {fetchCamerasAction, fetchPromoAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductsProcess = {
  products: [],
  isProductsLoaded: false,
  productsTotalCount: 0,
  promo: null,
  isPromoLoaded: false
};

export const productsProcess = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isProductsLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.productsTotalCount = action.payload.dataTotalCount;
        state.isProductsLoaded = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isProductsLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoaded = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoaded = false;
        toast('There was an error loading, please try refreshing the page');
      });
  }
});
