import styles from "./styles.module.scss";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";

interface PaginationProps {
  limit: number;
  totalItens: number;
  offset: number;
  setOffset: (number: number) => void;
  storeDataAll: (number: number) => void;
}

const maxItens = 9;
// maximo de botões
const maxLeft = (maxItens - 1) / 2;
// maximo de botões na esquerda

export function Pagination({
  limit,
  offset,
  totalItens,
  setOffset,
  storeDataAll
}: PaginationProps) {
  const currentPage = offset ? offset / limit + 1 : 1;

  const totalPages = Math.ceil(totalItens / limit);

  const firstPage = Math.max(currentPage - maxLeft, 1);

  function onPageChange(page: number) {
    storeDataAll((page - 1) * limit);
    setOffset((page - 1) * limit);
  }

  return (
    <ul className={styles.ulNavigation}>
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          className={styles.preNext}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </li>

      {Array.from({ length: Math.min(maxItens, totalPages) })
        .map((_, index) => index + firstPage)
        .map(
          (page) =>
            page <= 58 && (
              <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={
                    page === currentPage ? styles.activeItem : styles.default
                  }
                >
                  {" "}
                  {page}{" "}
                </button>
              </li>
            )
        )}

      <li>
        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          className={styles.preNext}
        >
          <BsFillArrowRightCircleFill />
        </button>
      </li>
    </ul>
  );
}
