import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName={styles.page}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1}
    />
  );
}