import styles from './loader.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

function Loader(): JSX.Element {
  return(
    <div className={styles.container} data-testid="loader">
      <ClipLoader color={'black'} size={100} />
    </div>
  );
}

export default Loader;
