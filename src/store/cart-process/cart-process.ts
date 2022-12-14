import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartProcess} from '../../types/state';
import {Product} from '../../types/product';
import {CartQuantityData} from '../../types/cart-quantity-data';
import {postCouponAction, postOrderAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: CartProcess = {
  products: [],
  modalProduct: null,
  isAddSuccess: false,
  isFormOrderPending: false,
  isFormOrderFulfilled: false,
  coupon: null,
  discount: 0
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
    },
    setQuantityProduct: (state, action) => {
      const {product, quantity} = action.payload as CartQuantityData;
      const cartFoundItem = state.products.find((item) => item.product.id === product.id);

      if (cartFoundItem) {
        cartFoundItem.quantity = quantity;
      }
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload as string;
    },
    setIsFormOrderFulfilled: (state, action) => {
      state.isFormOrderFulfilled = action.payload as boolean;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload / 100;
      })
      .addCase(postCouponAction.rejected, (state, action) => {
        state.coupon = null;
        state.discount = 0;
      })

      .addCase(postOrderAction.pending, (state) => {
        state.isFormOrderPending = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isFormOrderPending = false;
        state.isFormOrderFulfilled = true;
        state.products = [];
        state.coupon = null;
        state.discount = 0;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.isFormOrderPending = false;
        toast('?????? ???????????????? ???????????????? ????????????, ???????????????????? ??????????');
      });
  }
});

export const {
  setModalProduct,
  addToCart,
  removeFromCart,
  setIsAddCartSuccess,
  setQuantityProduct,
  setCoupon,
  setIsFormOrderFulfilled
} = cartProcess.actions;
