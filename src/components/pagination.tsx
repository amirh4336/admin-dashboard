import _ from "lodash";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

interface IPaginationProps {
  totalRecords: number;
  pageSize?: number;
}

const Pagination: FC<IPaginationProps> = ({ totalRecords, pageSize = import.meta.env.VITE_PAGE_SIZE }) => {
  const pages = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams?.get("page")) || 1;

  const prevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  const nextPage = () => {
    if (currentPage < pages) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  };
  
  return (
    <nav>
      <ul className="pagination pagination-lg">
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled opacity-50" : ""
          }`}
          onClick={prevPage}
        >
          <a className="page-link">قبلی</a>
        </li>
        {_.times(pages, (index) => (
          <li
            key={`page${index + 1}`}
            onClick={() => setSearchParams({ page: String(index + 1) })}
            className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
          >
            <a className="page-link">{index + 1}</a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === pages ? "disabled opacity-50" : ""
          }`}
          onClick={nextPage}
        >
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
