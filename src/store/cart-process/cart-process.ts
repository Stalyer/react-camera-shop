import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartProcess} from '../../types/state';
import {Product} from '../../types/product';
// import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction} from '../api-actions';
// import {toast} from 'react-toastify';

const initialState: CartProcess = {
  products: []
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload as Product;
      const cartFoundItem = state.products.find((item) => item.product.id === product.id);

      if (cartFoundItem) {
        cartFoundItem.quantity++;
      } else {
        state.products.push({
          product: product,
          quantity: 1
        });
      }
    },
    removeFromCart: (state, action) => {
      // const product = action.payload as Product;
      // const cartFoundItem = state.products.find((item) => item.product.id === product.id);
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchCameraAction.pending, (state) => {
  //       state.isProductLoaded = true;
  //     })
  // }
});

export const {addToCart, removeFromCart} = cartProcess.actions;
