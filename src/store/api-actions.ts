import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {Product, FetchReturnProducts, FetchQueryProducts} from '../types/product';
import {PromoProduct} from '../types/promo-product';

export const fetchCamerasAction = createAsyncThunk<FetchReturnProducts, FetchQueryProducts | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProducts/fetchCameras',
  async (params, {dispatch, extra: api}) => {
    const {data, headers} = await api.get<Product[]>(APIRoute.Cameras, {params});
    return {
      data: data,
      dataTotalCount: Number(headers['x-total-count'])
    };
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
