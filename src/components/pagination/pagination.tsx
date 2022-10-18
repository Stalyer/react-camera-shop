import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

function Pagination({currentPage, pageCount, onPageChange} : PaginationProps): JSX.Element {
  return(
    <div className="pagination">
      <ReactPaginate
        previousLabel='Назад'
        nextLabel='Далее'
        pageClassName='pagination__item'
        pageLinkClassName="pagination__link"
        previousClassName="pagination__item"
        previousLinkClassName="pagination__link pagination__link--text"
        nextClassName="pagination__item"
        nextLinkClassName="pagination__link pagination__link--text"
        breakLabel="..."
        breakClassName="pagination__item"
        breakLinkClassName="pagination__link"
        containerClassName="pagination__list"
        activeLinkClassName="pagination__link--active"
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={onPageChange}
        hrefBuilder={(page, count, selected) => page >= 1 && page <= count ? `/page-${page}` : '#'}
        hrefAllControls
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
}

export default Pagination;
