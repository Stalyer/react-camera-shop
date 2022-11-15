import {useState, ChangeEvent, KeyboardEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {getFoundProducts} from '../../store/products-process/selectors';
import {fetchSearchCamerasAction} from '../../store/api-actions';
import {QueryParam, SEARCH_LIMIT, AppRoute} from '../../const';

function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const foundProducts = useAppSelector(getFoundProducts);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);

    if (evt.target.value) {
      dispatch(fetchSearchCamerasAction({
        [QueryParam.NameLike]: searchText,
        [QueryParam.Limit]: SEARCH_LIMIT
      }));
    }
  };

  const redirectToProductPage = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      navigate(`${AppRoute.Product}/${id}`);
    }
  };

  return(
    <div className={`form-search${searchText && foundProducts.length ? ' list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchText}
            onChange={handleSearchChange}
          />
        </label>
        <ul className="form-search__select-list">
          {foundProducts.map(({id, name}) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={id.toString()}
              onClick={() => navigate(`${AppRoute.Product}/${id}`)}
              onKeyDown={(evt) => redirectToProductPage(evt, id)}
            >
              {name}
            </li>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => setSearchText('')}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
