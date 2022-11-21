import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getPriceProducts} from '../../store/products-process/selectors';
import {QueryParam, CHANGE_DELAY} from '../../const';

function CatalogFilterPrice(): JSX.Element {
  const priceProducts = useAppSelector(getPriceProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentInputPrice, setCurrentInputPrice] = useState<{minPrice: null | number; maxPrice: null | number}>({
    minPrice: Number(searchParams.get(QueryParam.PriceMin)) ? Number(searchParams.get(QueryParam.PriceMin)) : null,
    maxPrice: Number(searchParams.get(QueryParam.PriceMax)) ? Number(searchParams.get(QueryParam.PriceMax)) : null,
  });
  const [isUpdatePrice, setIsUpdatePrice] = useState(false);

  useEffect(() => {
    if(isUpdatePrice) {
      if(currentInputPrice.minPrice) {
        searchParams.set(QueryParam.PriceMin, String(currentInputPrice.minPrice));
      }
      if(currentInputPrice.maxPrice) {
        searchParams.set(QueryParam.PriceMax, String(currentInputPrice.maxPrice));
      }
      setIsUpdatePrice(false);
      setSearchParams(searchParams);
    }
  }, [isUpdatePrice, currentInputPrice, priceProducts, searchParams, setSearchParams]);

  useEffect(() => {
    const changeRangePrice = setTimeout(() => {
      if(currentInputPrice.minPrice && currentInputPrice.maxPrice) {
        if(currentInputPrice.minPrice > currentInputPrice.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: currentInputPrice.minPrice});
        }
      }

      if(currentInputPrice.minPrice) {
        if(currentInputPrice.minPrice < priceProducts.minPrice) {
          setCurrentInputPrice({...currentInputPrice, minPrice: priceProducts.minPrice});
        }
        if(currentInputPrice.minPrice > priceProducts.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, minPrice: priceProducts.maxPrice});
        }
      }

      if(currentInputPrice.maxPrice) {
        if(currentInputPrice.maxPrice > priceProducts.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: priceProducts.maxPrice});
        }
        if(currentInputPrice.maxPrice < priceProducts.minPrice) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: priceProducts.minPrice});
        }
      }

      if(currentInputPrice.minPrice || currentInputPrice.maxPrice) {
        setIsUpdatePrice(true);
      }
    }, CHANGE_DELAY);

    return () => clearTimeout(changeRangePrice);
  }, [currentInputPrice, priceProducts]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={QueryParam.PriceMin}
              placeholder={`от ${String(priceProducts.minPrice)}`}
              value={currentInputPrice.minPrice !== null ? currentInputPrice.minPrice : '' }
              onChange={(evt) => setCurrentInputPrice({...currentInputPrice, minPrice: Number(evt.target.value)})}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={QueryParam.PriceMax}
              placeholder={`до ${String(priceProducts.maxPrice)}`}
              value={currentInputPrice.maxPrice !== null ? currentInputPrice.maxPrice : '' }
              onChange={(evt) => setCurrentInputPrice({...currentInputPrice, maxPrice: Number(evt.target.value)})}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CatalogFilterPrice;
