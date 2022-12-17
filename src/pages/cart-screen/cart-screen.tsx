import {Link} from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import {useAppSelector, useAppDispatch} from '../../hooks';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketItem from '../../components/basket-item/basket-item';
import ModalRemoveItem from '../../components/modal-remove-item/modal-remove-item';
import ModalBasketSuccess from '../../components/modal-basket-success/modal-basket-success';
import {getCartProducts, getModalProduct} from '../../store/cart-process/selectors';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';

function CartScreen(): JSX.Element {
  // const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const modalProduct = useAppSelector(getModalProduct);

  const totalCartPrice = cartProducts.reduce((total, {product, quantity}) => total + (product.price * quantity), 0);
  const discount = 100;
  const totalPaymentPrice = totalCartPrice - discount;

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

                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      {/*  is-invalid is-valid */}
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить</button>
                    </form>
                  </div>
                </div>

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
                  <button className="btn btn--purple" type="button">Оформить заказ</button>
                </div>

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

        {false &&
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
