import {Link} from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import {useAppSelector} from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketItem from '../../components/basket-item/basket-item';
import CartCouponForm from '../../components/cart-coupon-form/cart-coupon-form';
import CartSummary from '../../components/cart-summary/cart-summary';
import ModalRemoveItem from '../../components/modal-remove-item/modal-remove-item';
import ModalBasketSuccess from '../../components/modal-basket-success/modal-basket-success';
import {getCartProducts, getModalProduct, getIsFormOrderFulfilled} from '../../store/cart-process/selectors';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';

function CartScreen(): JSX.Element {
  const cartProducts = useAppSelector(getCartProducts);
  const modalProduct = useAppSelector(getModalProduct);
  const isFormOrderFulfilled = useAppSelector(getIsFormOrderFulfilled);

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {cartProducts.length > 0 &&
              <ul className="basket__list">
                {cartProducts.map((cartProduct) => (
                  <BasketItem key={cartProduct.product.id} cartProduct={cartProduct} />
                ))}
              </ul>}

              {cartProducts.length === 0 &&
              <p>В корзине нет товаров, <Link to={`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`}>перейдите в каталог</Link></p>}

              <div className="basket__summary">
                <CartCouponForm />
                <CartSummary />
              </div>
            </div>
          </section>
        </div>
        {modalProduct &&
        <FocusLock>
          <RemoveScroll>
            <ModalRemoveItem />
          </RemoveScroll>
        </FocusLock>}

        {isFormOrderFulfilled &&
        <FocusLock>
          <RemoveScroll>
            <ModalBasketSuccess />
          </RemoveScroll>
        </FocusLock>}
      </main>
      <Footer />
    </>
  );
}

export default CartScreen;
