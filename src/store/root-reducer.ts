import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {productProcess} from './product-process/product-process';
import {productsProcess} from './products-process/products-process';
import {cartProcess} from './cart-process/cart-process';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Products]: productsProcess.reducer,
  [NameSpace.Cart]: cartProcess.reducer,
});
