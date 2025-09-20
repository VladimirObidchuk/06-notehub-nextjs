import React, { useState } from "react";
import css from "./Pagination.module.css";

type Props = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, onPageChange }: Props) => {
  const [activePage, setActivePage] = useState(1);

  const handleClick = (page: number) => {
    setActivePage(page);
    onPageChange(page);
  };
  return (
    <ul className={css.pagination}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <li key={page} onClick={() => handleClick(page)}>
            <a>{page}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
