import {productsProcess} from './products-process';
import {ProductsProcess} from '../../types/state';
import {makeFakeProducts, makeFakePromoProduct} from '../../utils/mocks';
import {fetchCamerasAction, fetchPromoAction} from '../api-actions';

const fakeProducts = makeFakeProducts();
const fakePromoProduct = makeFakePromoProduct();

describe('Reducer: products', () => {
  let state: ProductsProcess;

  beforeEach(() => {
    state = {
      products: [],
      isProductsLoaded: false,
      productsTotalCount: 0,
      promo: null,
      foundProducts: [],
      productsPriceRange: {
        minPrice: 0,
        maxPrice: 0
      }
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(productsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        products: [],
        isProductsLoaded: false,
        productsTotalCount: 0,
        promo: null,
        foundProducts: [],
        productsPriceRange: {
          minPrice: 0,
          maxPrice: 0
        }
      });
  });

  describe('fetchCameraAction test', () => {
    it('should change status isProductsLoaded while waiting for products to load', () => {
      expect(productsProcess.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({...state, isProductsLoaded: true});
    });
    it('should update products', () => {
      expect(productsProcess.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: {data: fakeProducts, dataTotalCount: 1}}))
        .toEqual({...state, products: fakeProducts, productsTotalCount: 1});
    });
    it('should change status isProductsLoaded on error', () => {
      expect(productsProcess.reducer(state, {type: fetchCamerasAction.rejected.type}))
        .toEqual({...state, isProductsLoaded: false});
    });
  });

  describe('fetchPromoAction test', () => {
    it('should update promoProduct', () => {
      expect(productsProcess.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromoProduct}))
        .toEqual({...state, promo: fakePromoProduct});
    });
  });

});
