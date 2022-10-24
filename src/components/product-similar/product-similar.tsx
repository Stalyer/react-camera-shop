import ProductCard from '../product-card/product-card';
import {Product} from '../../types/product';

const SLIDER_SHOW_COUNT = 3;

type ProductSimilarProps = {
  products: Product[];
}

function ProductSimilar({products} : ProductSimilarProps): JSX.Element {
  const productsActive = products.slice(0, SLIDER_SHOW_COUNT);
  return(
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {productsActive.map((product) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                isActive
              />
            ))}
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
