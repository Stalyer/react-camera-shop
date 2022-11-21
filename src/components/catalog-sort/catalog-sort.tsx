import {ChangeEvent} from 'react';
import {useSearchParams} from 'react-router-dom';
import {QueryParam, SortType, SortOrder} from '../../const';

function CatalogSort(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortButtonChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    searchParams.set(name, value);
    if(!searchParams.has(QueryParam.Order)) {
      searchParams.set(QueryParam.Order, SortOrder.Asc);
    }
    setSearchParams(searchParams);
  };

  return(
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name={QueryParam.Sort}
                value={SortType.Price}
                onChange={handleSortButtonChange}
                checked={searchParams.get(QueryParam.Sort) === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name={QueryParam.Sort}
                value={SortType.Rating}
                onChange={handleSortButtonChange}
                checked={searchParams.get(QueryParam.Sort) === SortType.Rating}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                aria-label="По возрастанию"
                name={QueryParam.Order}
                value={SortOrder.Asc}
                onChange={handleSortButtonChange}
                checked={searchParams.get(QueryParam.Order) === SortOrder.Asc}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                aria-label="По убыванию"
                name={QueryParam.Order}
                value={SortOrder.Desc}
                onChange={handleSortButtonChange}
                checked={searchParams.get(QueryParam.Order) === SortOrder.Desc}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
