import styles from "./styles.module.scss";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";

interface PaginationProps {
  limit: number;
  totalItens: number;
  offset: number;
  setOffset: (number: number) => void;
  getPokemons: (number: number) => void;
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
  getPokemons,
}: PaginationProps) {
  const [pageOne, setPageOne] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const currentPage = offset ? offset / limit + 1 : 1;

  const totalPages = Math.ceil(totalItens / limit);


  const firstPage = Math.max(currentPage - maxLeft, 1);

  function onPageChange(page: number) {
    getPokemons((page - 1) * limit);
    setOffset((page - 1) * limit);
    (page >= 6) ? setPageOne(true) : setPageOne(false);
    (page <= 57) ? setLastPage(true) : setLastPage(false);
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

      {pageOne && (
          <li>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              onPageChange(1);
            }}
            className={styles.default}
          >
            1
          </button>
        </li>
      )}

      {Array.from({ length: Math.min(maxItens, totalPages) })
        .map((_, index) => index + firstPage)
        .map((page) => (
          page <= 58 &&
             ( <li key={page}>
                <button
                  onClick={() => onPageChange(page)}
                  className={
                    page === currentPage ? styles.activeItem : styles.default
                  }
                >
                  {" "}
                  {page}{" "}
                </button>
              </li>)
            
        ))}

        
      {lastPage && (
          <li>
          <button
            onClick={() => {
              onPageChange(58);
            }}
            className={styles.default}
          >
            58
          </button>
        </li>
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
