import * as React from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PERPAGE = 10;

type Options = {
  page?: number;
  perPage?: number;
};

export function useFilter(options?: Options) {
  const [page, setPage] = React.useState(options?.page ?? DEFAULT_PAGE);
  const [perPage, setPerPage] = React.useState(
    options?.perPage ?? DEFAULT_PERPAGE,
  );

  const setPagination = React.useCallback((_page: number, _perPage: number) => {
    setPage(_page);
    setPerPage(_perPage);
  }, []);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    setPagination,
  };
}
