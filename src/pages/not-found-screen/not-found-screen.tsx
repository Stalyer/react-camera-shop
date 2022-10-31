import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {AppRoute} from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <section className="container not-found">
            <h1>404 Not Found</h1>
            <Link to={AppRoute.Root}>Вернуться на главную страницу</Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundScreen;
