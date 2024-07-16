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

export const useFetchData = () => {
  const [data, setData] = useState<string[] | null>(null);
  const fetchData = async (): Promise<DataType[]> => {
    const request = await fetch(baseURL + 'Kazakhstan');
    if (!request.ok) {
      throw new Error('Network response was not ok');
    }
    return request.json();
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
            console.error('Error fetching data:', e);
          });
      }, 5000),
    []
  );

  useEffect(() => {
    setData(null);
    delayFetch();
  }, []);
  return { data };
};
