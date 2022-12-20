import {store} from '../store/index';
import {Product, CartProduct} from './product';
import {PromoProduct} from './promo-product';
import {Review} from './review';

export type ProductProcess = {
  product: Product | null;
  isProductLoaded: boolean;
  similar: Product[];
  reviews: Review[];
  isFormReviewSubmitted: boolean;
}

export type ProductsProcess = {
  products: Product[];
  isProductsLoaded: boolean;
  productsTotalCount: number;
  promo: PromoProduct | null;
  foundProducts: Product[];
  productsPriceRange: number[];
  isFilterReset: boolean;
  isFilterActive: boolean;
}

export type CartProcess = {
  products: CartProduct[];
  modalProduct: Product | null;
  isAddSuccess: boolean;
  isFormOrderPending: boolean;
  isFormOrderFulfilled: boolean;
  coupon: string | null;
  discount: number;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
