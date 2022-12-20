import {useAppSelector, useAppDispatch} from '../../hooks';
import {getCartProducts, getCoupon, getDiscount, getIsFormOrderPending} from '../../store/cart-process/selectors';
import {postOrderAction} from '../../store/api-actions';

function CartSummary(): JSX.Element {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const discountPercent = useAppSelector(getDiscount);
  const coupon = useAppSelector(getCoupon);
  const isFormOrderPending = useAppSelector(getIsFormOrderPending);

  const totalCartPrice = cartProducts.reduce((total, {product, quantity}) => total + (product.price * quantity), 0);
  const discount = Math.round(totalCartPrice * discountPercent);
  const totalPaymentPrice = totalCartPrice - discount;

  const handleOrderClick = () => {
    const cartProductsIds = cartProducts.map(({product}) => product.id);
    dispatch(postOrderAction({
      camerasIds: cartProductsIds,
      coupon: coupon ? coupon : null
    }));
  };

  return(
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalCartPrice.toLocaleString('ru-RU')} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={`basket__summary-value${discount > 0 ? ' basket__summary-value--bonus' : ''}`}>{discount.toLocaleString('ru-RU')} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{totalPaymentPrice.toLocaleString('ru-RU')} ₽</span>
      </p>
      <button
        className="btn btn--purple"
        type="button"
        onClick={handleOrderClick}
        disabled={isFormOrderPending}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export default CartSummary;
