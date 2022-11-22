import {useSearchParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import CatalogFilterPrice from '../catalog-filter-price/catalog-filter-price';
import CatalogFilterCheckbox from '../catalog-filter-checkbox/catalog-filter-checkbox';
import {changeIsFilterReset} from '../../store/products-process/products-process';
import {FILTER_PARAM} from '../../const';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleResetBtnClick = () => {
    const newSearchParams = Array.from(searchParams.entries()).filter(([key]) => !FILTER_PARAM.includes(key));
    dispatch(changeIsFilterReset(true));
    setSearchParams(newSearchParams);
  };

  return(
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogFilterPrice />
        <CatalogFilterCheckbox />
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetBtnClick}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
