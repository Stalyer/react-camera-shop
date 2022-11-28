import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPriceProducts, getIsFilterReset} from '../../store/products-process/selectors';
import {changeIsFilterReset, changeIsFilterActive} from '../../store/products-process/products-process';
import {QueryParam, CHANGE_DELAY} from '../../const';

function CatalogFilterPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const priceProducts = useAppSelector(getPriceProducts);
  const isFilterReset = useAppSelector(getIsFilterReset);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentInputPrice, setCurrentInputPrice] = useState<{min: null | number; max: null | number}>({
    min: Number(searchParams.get(QueryParam.PriceMin)) ? Number(searchParams.get(QueryParam.PriceMin)) : null,
    max: Number(searchParams.get(QueryParam.PriceMax)) ? Number(searchParams.get(QueryParam.PriceMax)) : null,
  });
  const [isUpdatePrice, setIsUpdatePrice] = useState(false);

  const allPriceMin = priceProducts[0];
  const allPriceMax = priceProducts[priceProducts.length - 1];

  useEffect(() => {
    if(
      (searchParams.has(QueryParam.PriceMin) && currentInputPrice.min === null)
      || (searchParams.has(QueryParam.PriceMax) && currentInputPrice.max === null)
    ) {
      if(currentInputPrice.min === null) {
        searchParams.delete(QueryParam.PriceMin);
      }

      if(currentInputPrice.max === null) {
        searchParams.delete(QueryParam.PriceMax);
      }

      setSearchParams(searchParams);
    }
  }, [searchParams, currentInputPrice, setSearchParams]);

  useEffect(() => {
    if(isUpdatePrice) {
      if(currentInputPrice.min) {
        searchParams.set(QueryParam.PriceMin, String(currentInputPrice.min));
      }

      if(currentInputPrice.max) {
        searchParams.set(QueryParam.PriceMax, String(currentInputPrice.max));
      }

      setIsUpdatePrice(false);
      setSearchParams(searchParams);
      dispatch(changeIsFilterActive(true));
    }
  }, [isUpdatePrice, currentInputPrice, priceProducts, searchParams, setSearchParams, dispatch]);

  useEffect(() => {
    const inputMin = currentInputPrice.min;
    const inputMax = currentInputPrice.max;

    if(inputMin === 0) {
      setCurrentInputPrice({...currentInputPrice, min: null});
    }

    if(inputMax === 0) {
      setCurrentInputPrice({...currentInputPrice, max: null});
    }

    if(isFilterReset) {
      setCurrentInputPrice({min: null, max: null});
      dispatch(changeIsFilterReset(false));
    }

    const changeRangePrice = setTimeout(() => {
      if(inputMin !== null && inputMax !== null) {
        if(inputMin > inputMax) {
          setCurrentInputPrice({...currentInputPrice, max: inputMin});
        }
      }

      if(inputMin !== null) {
        const currentProductPriceMin = priceProducts.find((price) => price >= inputMin);
        if(currentProductPriceMin && inputMin < currentProductPriceMin) {
          setCurrentInputPrice({...currentInputPrice, min: currentProductPriceMin});
        }
        if(inputMin < allPriceMin) {
          setCurrentInputPrice({...currentInputPrice, min: allPriceMin});
        }
        if(inputMin > allPriceMax) {
          setCurrentInputPrice({...currentInputPrice, min: allPriceMax});
        }
      }

      if(inputMax !== null) {
        const currentMaxPriceIndex = priceProducts.findIndex((price) => price > inputMax);
        if(currentMaxPriceIndex && inputMax > priceProducts[currentMaxPriceIndex - 1]) {
          setCurrentInputPrice({...currentInputPrice, max: priceProducts[currentMaxPriceIndex - 1]});
        }
        if(inputMax > allPriceMax) {
          setCurrentInputPrice({...currentInputPrice, max: allPriceMax});
        }
        if(inputMax < allPriceMin && inputMin === null) {
          setCurrentInputPrice({...currentInputPrice, max: allPriceMin});
        }
      }

      if(inputMin !== null || inputMax !== null) {
        setIsUpdatePrice(true);
      }

    }, CHANGE_DELAY);

    return () => clearTimeout(changeRangePrice);
  }, [currentInputPrice, priceProducts, isFilterReset, allPriceMin, allPriceMax, dispatch]);

  return(
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={QueryParam.PriceMin}
              placeholder={allPriceMin ? String(allPriceMin) : 'От'}
              value={currentInputPrice.min !== null ? currentInputPrice.min : '' }
              onChange={(evt) => setCurrentInputPrice({...currentInputPrice, min: Number(evt.target.value)})}
              data-testid="input-price-min"
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name={QueryParam.PriceMax}
              placeholder={allPriceMax ? String(allPriceMax) : 'До'}
              value={currentInputPrice.max !== null ? currentInputPrice.max : '' }
              onChange={(evt) => setCurrentInputPrice({...currentInputPrice, max: Number(evt.target.value)})}
              data-testid="input-price-max"
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default CatalogFilterPrice;
