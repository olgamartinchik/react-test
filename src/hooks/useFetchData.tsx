import { useEffect, useMemo, useState } from 'react';
import { baseURL } from '../helpers/api.helpers';
import { debounce } from '../helpers/debounce';
type DataType = {
  domains: Array<string>;
  country: string;
  alpha_two_code: string;
  web_pages: Array<string>;
  name: string;
  'state-province': null | string;
};
const PAGE_SIZE = 5;

export const useFetchData = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (): Promise<DataType[]> => {
    const request = await fetch(baseURL + 'Kazakhstan');
    if (!request.ok) {
      throw new Error('Network response was not ok');
    }
    return request.json();
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data?.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const setNextPage = () => {
    const totalPages = Math.ceil(data?.length! / PAGE_SIZE);

    setCurrentPage((prev) => (totalPages === prev ? prev : prev + 1));
  };

  const setPrevPage = () => {
    setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const delayFetch: any = useMemo(
    () =>
      debounce(() => {
        fetchData()
          .then((value: DataType[]) => {
            const names = value.map((item: DataType) => item.name);
            setData(names);
          })
          .catch((e) => {
            console.error('Error:', e);
          });
      }, 5000),
    []
  );

  useEffect(() => {
    setData(null);
    setCurrentPage(1);
    delayFetch();
  }, []);
  return { data, paginatedData, currentPage, setNextPage, setPrevPage };
};
