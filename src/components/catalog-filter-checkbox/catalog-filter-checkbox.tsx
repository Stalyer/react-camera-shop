import {ChangeEvent} from 'react';
import {useSearchParams} from 'react-router-dom';
import {QueryParam} from '../../const';

const FILTERS = [
  {
    title: 'Категория',
    param: QueryParam.Category,
    values: ['Фотоаппарат', 'Видеокамера']
  },
  {
    title: 'Тип камеры',
    param: QueryParam.Type,
    values: ['Цифровая', 'Плёночная', 'Моментальная', 'Коллекционная']
  },
  {
    title: 'Уровень',
    param: QueryParam.Level,
    values: ['Нулевой', 'Любительский', 'Профессиональный']
  },
];

const FILTER_RESTRICTION = {
  category: ['Видеокамера'],
  type: ['Плёночная', 'Моментальная']
};

function CatalogFilterCheckbox(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchParamsValues = Array.from(searchParams.values());
  const isCheckDisabledCategory = currentSearchParamsValues.some((value) => FILTER_RESTRICTION.type.includes(value));
  const isCheckDisabledType = currentSearchParamsValues.some((value) => FILTER_RESTRICTION.category.includes(value));

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    const currentParamValues = searchParams.getAll(name);

    if (currentParamValues.includes(value)) {
      const newParamValues = currentParamValues.filter((paramValue) => paramValue !== value);
      searchParams.delete(name);
      newParamValues.forEach((paramValue) => searchParams.append(name, paramValue));
    } else {
      searchParams.append(name, value);
    }

    setSearchParams(searchParams);
  };

  return(
    <>
      {FILTERS.map(({title, param, values}) => (
        <fieldset className="catalog-filter__block" key={title}>
          <legend className="title title--h5">{title}</legend>
          {values.map((value) => {
            const isDisabledCategory = isCheckDisabledCategory && FILTER_RESTRICTION.category.includes(value);
            const isDisabledType = isCheckDisabledType && FILTER_RESTRICTION.type.includes(value);

            return (
              <div className="custom-checkbox catalog-filter__item" key={value}>
                <label>
                  <input
                    type="checkbox"
                    name={param}
                    value={value}
                    onChange={handleFilterChange}
                    checked={searchParams.getAll(param).includes(value)}
                    disabled={isDisabledCategory || isDisabledType}
                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{value}</span>
                </label>
              </div>
            );
          })}
        </fieldset>
      ))}
    </>
  );
}

export default CatalogFilterCheckbox;
