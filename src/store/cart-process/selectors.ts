import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Product, CartProduct} from '../../types/product';

export const getCartProducts = (state: State): CartProduct[] => state[NameSpace.Cart].products;
export const getModalProduct = (state: State): Product | null => state[NameSpace.Cart].modalProduct;
export const getIsAddToCartSuccess = (state: State): boolean => state[NameSpace.Cart].isAddSuccess;
export const getIsFormOrderPending = (state: State): boolean => state[NameSpace.Cart].isFormOrderPending;
export const getIsFormOrderFulfilled = (state: State): boolean => state[NameSpace.Cart].isFormOrderFulfilled;
export const getCoupon = (state: State): string | null => state[NameSpace.Cart].coupon;
export const getDiscount = (state: State): number => state[NameSpace.Cart].discount;
