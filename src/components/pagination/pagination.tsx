import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
}

function Pagination({currentPage, totalPages} : PaginationProps): JSX.Element {
  const location = useLocation();

  return(
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}/page-${currentPage - 1}${location.search}`}>Назад</Link>
        </li>}
        {Array.from({length: totalPages}, (_value, index) => {
          const pageId = index + 1;
          const activeClass = pageId === currentPage ? ' pagination__link--active' : '';

          return (
            <li className="pagination__item" key={index}>
              <Link className={`pagination__link${activeClass}`} to={`${AppRoute.Catalog}/page-${pageId}${location.search}`}>{pageId}</Link>
            </li>
          );
        })}
        {currentPage !== totalPages &&
        <li className="pagination__item">
          <Link className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}/page-${currentPage + 1}${location.search}`}>Далее</Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;
