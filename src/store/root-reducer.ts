import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {mainProcess} from './main-process/main-process';

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainProcess.reducer,
});
