import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ProductsProcess} from '../../types/state';
import {fetchCamerasAction, fetchPromoAction, fetchSearchCamerasAction, fetchPriceCamerasAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: ProductsProcess = {
  products: [],
  isProductsLoaded: false,
  productsTotalCount: 0,
  promo: null,
  foundProducts: [],
  productsPriceRange: [],
  isFilterReset: false,
  isFilterActive: false
};

export const productsProcess = createSlice({
  name: NameSpace.Products,
  initialState,
  reducers: {
    changeIsFilterReset: (state, action) => {
      state.isFilterReset = action.payload as boolean;
    },
    changeIsFilterActive: (state, action) => {
      state.isFilterActive = action.payload as boolean;
    }
  },
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
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      })

      .addCase(fetchPriceCamerasAction.fulfilled, (state, action) => {
        state.productsPriceRange = action.payload.map((product) => product.price);
      })
      .addCase(fetchPriceCamerasAction.rejected, () => {
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      })

      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, () => {
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      })

      .addCase(fetchSearchCamerasAction.fulfilled, (state, action) => {
        state.foundProducts = action.payload;
      })
      .addCase(fetchSearchCamerasAction.rejected, () => {
        toast.error('При загрузке произошла ошибка, попробуйте обновить страницу');
      });
  }
});

export const {changeIsFilterReset, changeIsFilterActive} = productsProcess.actions;
