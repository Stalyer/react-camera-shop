import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPriceProducts, getIsFilterReset} from '../../store/products-process/selectors';
import {changeIsFilterReset} from '../../store/products-process/products-process';
import {QueryParam, CHANGE_DELAY} from '../../const';

function CatalogFilterPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const priceProducts = useAppSelector(getPriceProducts);
  const isFilterReset = useAppSelector(getIsFilterReset);
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
    if(isFilterReset) {
      setCurrentInputPrice({minPrice: null, maxPrice: null});
      dispatch(changeIsFilterReset(false));
    }

    const changeRangePrice = setTimeout(() => {
      if(currentInputPrice.minPrice !== null && currentInputPrice.maxPrice !== null) {
        if(currentInputPrice.minPrice > currentInputPrice.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: currentInputPrice.minPrice});
        }
      }

      if(currentInputPrice.minPrice !== null) {
        if(currentInputPrice.minPrice < priceProducts.minPrice) {
          setCurrentInputPrice({...currentInputPrice, minPrice: priceProducts.minPrice});
        }
        if(currentInputPrice.minPrice > priceProducts.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, minPrice: priceProducts.maxPrice});
        }
      }

      if(currentInputPrice.maxPrice !== null) {
        if(currentInputPrice.maxPrice > priceProducts.maxPrice) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: priceProducts.maxPrice});
        }
        if(currentInputPrice.maxPrice < priceProducts.minPrice && currentInputPrice.minPrice === null) {
          setCurrentInputPrice({...currentInputPrice, maxPrice: priceProducts.minPrice});
        }
      }

      if(currentInputPrice.minPrice !== null || currentInputPrice.maxPrice !== null) {
        setIsUpdatePrice(true);
      }

    }, CHANGE_DELAY);

    return () => clearTimeout(changeRangePrice);
  }, [currentInputPrice, priceProducts, isFilterReset, dispatch]);

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
              data-testid="input-price-min"
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
              data-testid="input-price-max"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CatalogFilterPrice;
