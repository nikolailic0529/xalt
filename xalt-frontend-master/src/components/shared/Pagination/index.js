import React from 'react';
import styled from 'styled-components';
import { theme } from 'components';
import { space } from 'styled-system';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  ${space};
`;

PaginationWrapper.defaultProps = {
  p: ['32px 8px 0 0'],
  ml: ['auto'],
};

const PaginationButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${theme.colors.white};
  border: none;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.2px;

  &.active {
    color: ${theme.colors.darkPink};
    text-decoration: underline;
    font-size: 24px;
  }
  :disabled {
    color: ${theme.colors.gray500};
  }
`;

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const pages = [];

  while (i <= to) {
    pages.push(i);
    i += step;
  }

  return pages;
};

const Pagination = (props) => {
  const { total, perPage, page, setPage, onPageChange, isLimit } = props;

  const totalPages = Math.ceil(total / perPage);

  const fetchPageNumbers = () => {
    const pages = range(page, page);
    if (isLimit && totalPages < page) {
      setPage(totalPages);
    }
    return [LEFT_PAGE, ...pages, RIGHT_PAGE];
  };

  const buttons = fetchPageNumbers();

  return (
    <PaginationWrapper>
      {buttons.map((item, index) => {
        if (item === LEFT_PAGE) {
          return (
            <PaginationButton
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              key={index}
            >
              &laquo;
            </PaginationButton>
          );
        }
        if (item === RIGHT_PAGE) {
          return (
            <PaginationButton
              disabled={isLimit && totalPages === page}
              onClick={() => onPageChange(page + 1)}
              key={index}
            >
              &raquo;
            </PaginationButton>
          );
        }
        return (
          <PaginationButton
            key={index}
            className={`page-item${page === item ? ' active' : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </PaginationButton>
        );
      })}
    </PaginationWrapper>
  );
};

export default Pagination;
