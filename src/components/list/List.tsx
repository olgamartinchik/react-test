import { useFetchData } from '../../hooks/useFetchData';
import { Item } from '../item/Item';

export const List = () => {
  const { data } = useFetchData();

  return (
    <>
      <ul>
        {data
          ? data.map((item) => <Item key={item} name={item} />)
          : 'Loading...'}
      </ul>
    </>
  );
};
