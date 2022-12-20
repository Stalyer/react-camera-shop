import {useState, FormEvent, ChangeEvent} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getCoupon} from '../../store/cart-process/selectors';
import {postCouponAction} from '../../store/api-actions';
import {setCoupon} from '../../store/cart-process/cart-process';
import {VALID_COUPONS} from '../../const';

function CartCouponForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const [couponForm, setCouponForm] = useState({
    coupon: coupon
  });
  const [isCouponFormDisabled, setIsCouponFormDisabled] = useState(false);
  const [isCouponFormValid, setIsCouponFormValid] = useState<string | null>(null);

  const sendCoupon = async () => {
    setIsCouponFormDisabled(true);
    const response = await dispatch(postCouponAction(couponForm));

    if (response.meta.requestStatus === 'fulfilled') {
      dispatch(setCoupon(couponForm.coupon));
      setIsCouponFormDisabled(false);
      setIsCouponFormValid('valid');
    }

    if (response.meta.requestStatus === 'rejected') {
      setIsCouponFormDisabled(false);
      setIsCouponFormValid('invalid');
    }
  };

  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (couponForm.coupon !== null && VALID_COUPONS.includes(couponForm.coupon)) {
      sendCoupon();
    } else {
      setIsCouponFormValid('invalid');
    }
  };

  const handleInputCouponChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    if (value.includes(' ')) {
      return;
    }

    setCouponForm({coupon: evt.target.value});
    setIsCouponFormValid(null);
  };

  return(
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#" onSubmit={handleCouponSubmit}>
          <div className={`custom-input ${isCouponFormValid ? ` is-${isCouponFormValid}` : ''}`}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="coupon"
                placeholder="Введите промокод"
                value={couponForm.coupon ? couponForm.coupon : ''}
                onChange={handleInputCouponChange}
                disabled={isCouponFormDisabled}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            className="btn"
            type="submit"
            disabled={
              isCouponFormDisabled ||
              couponForm.coupon === null ||
              couponForm.coupon === ''
            }
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartCouponForm;
