import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartProcess} from '../../types/state';
import {Product} from '../../types/product';
// import {fetchCameraAction, fetchCameraSimilarAction, fetchCameraReviewsAction, postReviewAction} from '../api-actions';
// import {toast} from 'react-toastify';

const initialState: CartProcess = {
  products: [],
  modalProduct: null,
  isAddSuccess: false,
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    setModalProduct: (state, action) => {
      state.modalProduct = action.payload as Product;
    },
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

      state.isAddSuccess = true;
    },
    removeFromCart: (state, action) => {
      const product = action.payload as Product;
      state.products = state.products.filter((item) => item.product.id !== product.id);
    },
    setIsAddCartSuccess: (state, action) => {
      state.isAddSuccess = action.payload as boolean;
    }
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchCameraAction.pending, (state) => {
  //       state.isProductLoaded = true;
  //     })
  // }
});

export const {setModalProduct, addToCart, removeFromCart, setIsAddCartSuccess} = cartProcess.actions;
