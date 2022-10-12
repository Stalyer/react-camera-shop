import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {productsProcess} from './products-process/products-process';

export const rootReducer = combineReducers({
  [NameSpace.Products]: productsProcess.reducer,
});
