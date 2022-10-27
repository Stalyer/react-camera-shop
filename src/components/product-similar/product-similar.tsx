import {useState, useMemo} from 'react';
import ProductCard from '../product-card/product-card';
import {Product} from '../../types/product';
import {SLIDE_PER_SHOW} from '../../const';

type ProductSimilarProps = {
  products: Product[];
}

function ProductSimilar({products} : ProductSimilarProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = useMemo(() => (
    Math.ceil(products.length / SLIDE_PER_SHOW)
  ), [products]);
  const productsEndOffset = currentSlide + SLIDE_PER_SHOW;
  const activeProducts = products.slice(currentSlide, productsEndOffset);

  const handleBtnPrevClick = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleBtnNextClick = () => {
    setCurrentSlide(currentSlide + 1);
  };

  return(
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {activeProducts.map((product) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                isActive
              />
            ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={currentSlide === 0}
            onClick={handleBtnPrevClick}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={currentSlide === totalSlides}
            onClick={handleBtnNextClick}
          >
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
