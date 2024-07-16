import { FC } from 'react';

type ButtonType = {
  text: string;
  handlerButton: () => void;
};
export const Button: FC<ButtonType> = ({ text, handlerButton }) => {
  return <button onClick={handlerButton}>{text}</button>;
};
