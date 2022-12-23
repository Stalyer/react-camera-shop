import {
  cartProcess,
  setModalProduct,
  addToCart,
  removeFromCart,
  setIsAddCartSuccess,
  setQuantityProduct,
  setCoupon,
  setIsFormOrderFulfilled
} from './cart-process';
import {CartProcess} from '../../types/state';
import {makeFakeProduct, makeFakeCartProducts} from '../../utils/mocks';
import {postCouponAction, postOrderAction} from '../api-actions';

const fakeProduct = makeFakeProduct();
const fakeCartProducts = makeFakeCartProducts();

describe('Reducer: cart', () => {
  let state: CartProcess;

  beforeEach(() => {
    state = {
      products: [],
      modalProduct: null,
      isAddSuccess: false,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(cartProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        products: [],
        modalProduct: null,
        isAddSuccess: false,
        isFormOrderPending: false,
        isFormOrderFulfilled: false,
        coupon: null,
        discount: 0
      });
  });

  it('should change modal product', () => {
    expect(cartProcess.reducer(state, setModalProduct(fakeProduct)))
      .toEqual({...state, modalProduct: fakeProduct});
  });

  it('should product add to cart', () => {
    expect(cartProcess.reducer(state, addToCart(fakeCartProducts[0].product)))
      .toEqual({...state, products: fakeCartProducts, isAddSuccess: true});
  });

  it('should product remove from cart', () => {
    state = {
      products: fakeCartProducts,
      modalProduct: null,
      isAddSuccess: false,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
    expect(cartProcess.reducer(state, removeFromCart(fakeCartProducts[0].product)))
      .toEqual({...state, products: []});
  });

  it('should set IsAddCartSuccess', () => {
    state = {
      products: [],
      modalProduct: null,
      isAddSuccess: true,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
    expect(cartProcess.reducer(state, setIsAddCartSuccess(false)))
      .toEqual({...state, isAddSuccess: false});
  });

  it('should set QuantityProduct', () => {
    state = {
      products: fakeCartProducts,
      modalProduct: null,
      isAddSuccess: false,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
    expect(cartProcess.reducer(state, setQuantityProduct({
      product: fakeCartProducts[0].product,
      quantity: 2,
    })))
      .toEqual({...state, products: [{
        product: fakeCartProducts[0].product,
        quantity: 2
      }]});
  });

  it('should set Coupon', () => {
    state = {
      products: [],
      modalProduct: null,
      isAddSuccess: false,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
    expect(cartProcess.reducer(state, setCoupon('test')))
      .toEqual({...state, coupon: 'test'});
  });

  it('should set IsFormOrderFulfilled', () => {
    state = {
      products: [],
      modalProduct: null,
      isAddSuccess: false,
      isFormOrderPending: false,
      isFormOrderFulfilled: false,
      coupon: null,
      discount: 0
    };
    expect(cartProcess.reducer(state, setIsFormOrderFulfilled(true)))
      .toEqual({...state, isFormOrderFulfilled: true});
  });

  describe('postCouponAction test', () => {
    it('should update discount', () => {
      expect(cartProcess.reducer(state, {type: postCouponAction.fulfilled.type, payload: 20}))
        .toEqual({...state, discount: 20 / 100});
    });
    it('should change discount on error', () => {
      expect(cartProcess.reducer(state, {type: postCouponAction.rejected.type}))
        .toEqual({...state, discount: 0});
    });
  });

  describe('postOrderAction test', () => {
    it('should change status isFormOrderPending while waiting for order', () => {
      expect(cartProcess.reducer(state, {type: postOrderAction.pending.type}))
        .toEqual({...state, isFormOrderPending: true});
    });
    it('should update store cart', () => {
      expect(cartProcess.reducer(state, {type: postOrderAction.fulfilled.type}))
        .toEqual({...state, isFormOrderPending : false, isFormOrderFulfilled: true});
    });
    it('should change isFormOrderPending  on error', () => {
      expect(cartProcess.reducer(state, {type: postOrderAction.rejected.type}))
        .toEqual({...state, isFormOrderPending : false});
    });
  });
});
