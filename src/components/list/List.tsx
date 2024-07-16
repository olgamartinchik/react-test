import { useFetchData } from '../../hooks/useFetchData';
import { Item } from '../item/Item';
import { Pagination } from '../pagination/Pagination';

export const List = () => {
  const { data, paginatedData, currentPage, setNextPage, setPrevPage } =
    useFetchData();

  return (
    <>
      <ul>
        {data ? (
          paginatedData?.map((item) => <Item key={item} name={item} />)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
      <Pagination
        page={currentPage}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
      />
    </>
  );
};
