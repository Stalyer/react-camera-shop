import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Product} from '../../types/product';
import {PromoProduct} from '../../types/promo-product';

export const getProducts = (state: State): Product[] => state[NameSpace.Products].products;
export const getProductsTotalCount = (state: State): number => state[NameSpace.Products].productsTotalCount;
export const getLoadedProductsStatus = (state: State): boolean => state[NameSpace.Products].isProductsLoaded;
export const getPromo = (state: State): PromoProduct | null => state[NameSpace.Products].promo;
export const getLoadedPromoStatus = (state: State): boolean => state[NameSpace.Products].isPromoLoaded;
