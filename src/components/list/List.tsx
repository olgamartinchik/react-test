import { useFetchData } from '../../hooks/useFetchData';
import { Item } from '../item/Item';
import { Pagination } from '../pagination/Pagination';

export const List = () => {
  const { data, loading, currentPage, setNextPage, setPrevPage } =
    useFetchData();

  return (
    <>
      {!loading ? (
        <>
          <ul>
            {data?.map((item) => (
              <Item key={item.id} name={item.title} />
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Pagination
        page={currentPage}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
      />
    </>
  );
};
