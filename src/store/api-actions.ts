import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../const';
import {Product, FetchReturnProducts, FetchQueryProducts} from '../types/product';
import {PromoProduct} from '../types/promo-product';
import {Review} from '../types/review';
import {ReviewData} from '../types/review-data';
import {CouponData} from '../types/coupon-data';
import {OrderData} from '../types/order-data';

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

export const fetchPriceCamerasAction = createAsyncThunk<Product[], FetchQueryProducts | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProducts/fetchPriceCameras',
  async (params, {dispatch, extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Cameras, {params});
    return data;
  },
);

export const fetchSearchCamerasAction = createAsyncThunk<Product[], FetchQueryProducts | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProducts/fetchSearchCameras',
  async (params, {dispatch, extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Cameras, {params});
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

export const fetchCameraAction = createAsyncThunk<Product, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProduct/fetchCamera',
  async (productId, {dispatch, extra: api}) => {
    const {data} = await api.get<Product>(`${APIRoute.Cameras}/${productId}`);
    return data;
  },
);

export const fetchCameraReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProduct/fetchCameraReviews',
  async (productId, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${productId}/reviews`);
    return data;
  },
);

export const fetchCameraSimilarAction = createAsyncThunk<Product[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProduct/fetchCameraSimilar',
  async (productId, {dispatch, extra: api}) => {
    const {data} = await api.get<Product[]>(`${APIRoute.Cameras}/${productId}/similar`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Review, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataProduct/postReview',
  async (review, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.Reviews, review);
    return data;
  },
);

export const postCouponAction = createAsyncThunk<number, CouponData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataCart/postCoupon',
  async (coupon, {dispatch, extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Coupons, coupon);
    return data;
  },
);

export const postOrderAction = createAsyncThunk<string, OrderData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'dataCart/postOrder',
  async (order, {dispatch, extra: api}) => {
    const {data} = await api.post<string>(APIRoute.Orders, order);
    return data;
  },
);
