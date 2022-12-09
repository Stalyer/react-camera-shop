import {Link} from 'react-router-dom';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';
import FormSearch from '../form-search/form-search';

const MENU_ROUTES = [
  {
    title: 'Каталог',
    link: `${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`
  },
  {
    title: 'Гарантии',
    link: '#'
  },
  {
    title: 'Доставка',
    link: '#'
  },
  {
    title: 'О компании',
    link: '#'
  },
];

function Header(): JSX.Element {
  return(
    <header className="header" id="header">
      <div className="container">
        {window.location.pathname === AppRoute.Root ?
          <span className="header__logo">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo"></use>
            </svg>
          </span>
          :
          <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo"></use>
            </svg>
          </Link>}
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {MENU_ROUTES.map(({title, link}) => (
              <li className="main-nav__item" key={title}>
                <Link className="main-nav__link" to={link}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Cart}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="header__basket-count">3</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
