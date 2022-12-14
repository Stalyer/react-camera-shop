import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Product} from '../../types/product';
import {Review} from '../../types/review';

export const getProduct = (state: State): Product | null => state[NameSpace.Product].product;
export const getLoadedProductStatus = (state: State): boolean => state[NameSpace.Product].isProductLoaded;

export const getProductSimilar = (state: State): Product[] => state[NameSpace.Product].similar;

export const getProductReviews = (state: State): Review[] => state[NameSpace.Product].reviews;

export const getFormReviewSubmittedStatus = (state: State): boolean => state[NameSpace.Product].isFormReviewSubmitted;
