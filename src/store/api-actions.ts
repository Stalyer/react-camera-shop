import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {Product} from '../types/product';
import {PromoProduct} from '../types/promo-product';

export const fetchCamerasAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProducts/fetchCameras',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<PromoProduct, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProducts/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<PromoProduct>(APIRoute.Promo);
    return data;
  },
);
