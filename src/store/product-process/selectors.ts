import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Product} from '../../types/product';
import {Review} from '../../types/review';

export const getProduct = (state: State): Product | null => state[NameSpace.Product].product;
export const getLoadedProductStatus = (state: State): boolean => state[NameSpace.Product].isProductLoaded;

export const getProductSimilar = (state: State): Product[] => state[NameSpace.Product].similar;
export const getLoadedProductSimilarStatus = (state: State): boolean => state[NameSpace.Product].isProductSimilarLoaded;

export const getProductReviews = (state: State): Review[] => state[NameSpace.Product].reviews;
export const getLoadedProductReviewsStatus = (state: State): boolean => state[NameSpace.Product].isProductReviewsLoaded;
