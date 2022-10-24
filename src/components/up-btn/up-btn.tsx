const handleScrollToHeaderClick = () => {
  const header = document.querySelector('#header');
  if (header) {
    header.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

function UpBtn(): JSX.Element {
  return(
    <button type="button" className="up-btn" onClick={handleScrollToHeaderClick}>
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </button>
  );
}

export default UpBtn;
