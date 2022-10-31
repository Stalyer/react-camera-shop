import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {AppRoute, DEFAULT_ID_PAGE} from '../../const';

function MainScreen(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <section className="container">
            <h1>Главная страница в разработке</h1>
            <Link to={`${AppRoute.Catalog}/page-${DEFAULT_ID_PAGE}`}>Перейти в каталог</Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainScreen;
