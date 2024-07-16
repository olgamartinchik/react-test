import { FC } from 'react';
import { Button } from '../button/Button';

type PaginationType = {
  page: number;
  setNextPage: () => void;
  setPrevPage: () => void;
};
export const Pagination: FC<PaginationType> = ({
  page,
  setNextPage,
  setPrevPage,
}) => {
  return (
    <>
      <Button onClick={setPrevPage} disabled={page === 1}>
        Prev
      </Button>
      <span>{page}</span>
      <Button onClick={setNextPage}>Next</Button>
    </>
  );
};
