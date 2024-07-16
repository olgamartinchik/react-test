import { useEffect, useMemo, useRef, useState } from 'react';

import { debounce } from '../helpers/debounce';
type DataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const useFetchData = () => {
  const controllerRef = useRef<AbortController | null>(null);
  const [data, setData] = useState<DataType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    signal: AbortSignal,
    page: number
  ): Promise<DataType[]> => {
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`,
      {
        signal,
        method: 'GET',
      }
    );
    if (!request.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await request.json();

    return result;
  };

  const setNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const setPrevPage = () => {
    setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const delayFetch: any = useMemo(
    () =>
      debounce((page: number) => {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();

        fetchData(controllerRef.current.signal, page)
          .then((value: DataType[]) => {
            setData(value);
            setLoading(false);
          })
          .catch((e) => {
            console.error(e);
          });
      }, 2000),
    []
  );

  useEffect(() => {
    setLoading(true);
    delayFetch(currentPage);
    return () => {
      controllerRef.current?.abort();
    };
  }, [currentPage]);
  return {
    loading,
    data,
    currentPage,
    setNextPage,
    setPrevPage,
  };
};
