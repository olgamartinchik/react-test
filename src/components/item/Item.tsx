import { FC } from 'react';

type ItemType = {
  name: string;
};
export const Item: FC<ItemType> = ({ name }) => {
  return <li>{name}</li>;
};
