import { ButtonHTMLAttributes, FC } from 'react';

type ButtonType = {
  text: string;
  handlerButton: () => void;
};
export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} />;
};
