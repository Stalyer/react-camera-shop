import {productsProcess, changeIsFilterReset, changeIsFilterActive} from './products-process';
import {ProductsProcess} from '../../types/state';
import {makeFakeProducts, makeFakePromoProduct} from '../../utils/mocks';
import {fetchCamerasAction, fetchPriceCamerasAction, fetchSearchCamerasAction, fetchPromoAction} from '../api-actions';

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
      productsPriceRange: [],
      isFilterReset: false,
      isFilterActive: false
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
        productsPriceRange: [],
        isFilterReset: false,
        isFilterActive: false
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

  describe('fetchPriceCamerasAction test', () => {
    it('should update productsPriceRange', () => {
      expect(productsProcess.reducer(state, {type: fetchPriceCamerasAction.fulfilled.type, payload: fakeProducts}))
        .toEqual({...state, productsPriceRange: [fakeProducts[0].price]});
    });
  });

  describe('fetchPromoAction test', () => {
    it('should update promoProduct', () => {
      expect(productsProcess.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromoProduct}))
        .toEqual({...state, promo: fakePromoProduct});
    });
  });

  describe('fetchSearchCamerasAction test', () => {
    it('should update foundProduct', () => {
      expect(productsProcess.reducer(state, {type: fetchSearchCamerasAction.fulfilled.type, payload: fakeProducts}))
        .toEqual({...state, foundProducts: fakeProducts});
    });
  });

  it('should change the isFilterReset', () => {
    expect(productsProcess.reducer(state, changeIsFilterReset(true)))
      .toEqual({...state, isFilterReset: true});
  });

  it('should change the isFilterActive', () => {
    expect(productsProcess.reducer(state, changeIsFilterActive(true)))
      .toEqual({...state, isFilterActive: true});
  });

});
