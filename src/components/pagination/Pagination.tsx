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
      <Button text={'Prev'} handlerButton={setPrevPage} />
      <span>{page}</span>
      <Button text={'Next'} handlerButton={setNextPage} />
    </>
  );
};
