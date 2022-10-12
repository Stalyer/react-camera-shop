import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const MENU_ROUTES = [
  {
    title: 'Каталог',
    link: AppRoute.Catalog
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

const RESOURCE_ROUTES = [
  {
    title: 'Курсы операторов',
    link: '#'
  },
  {
    title: 'Блог',
    link: '#'
  },
  {
    title: 'Сообщество',
    link: '#'
  },
];

const SUPPORT_ROUTES = [
  {
    title: 'FAQ',
    link: '#'
  },
  {
    title: 'Задать вопрос',
    link: '#'
  },
];

function Footer(): JSX.Element {
  return(
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          {window.location.pathname === AppRoute.Root ?
            <span className="footer__logo">
              <svg width="100" height="36" aria-hidden="true">
                <use xlinkHref="#icon-logo-mono"></use>
              </svg>
            </span>
            :
            <Link className="footer__logo" to={AppRoute.Root} aria-label="Переход на главную">
              <svg width="100" height="36" aria-hidden="true">
                <use xlinkHref="#icon-logo-mono"></use>
              </svg>
            </Link>}
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              {MENU_ROUTES.map(({title, link}) => (
                <li className="footer__item" key={title}>
                  <Link className="link" to={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              {RESOURCE_ROUTES.map(({title, link}) => (
                <li className="footer__item" key={title}>
                  <Link className="link" to={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              {SUPPORT_ROUTES.map(({title, link}) => (
                <li className="footer__item" key={title}>
                  <Link className="link" to={link}>{title}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
