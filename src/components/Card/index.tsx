import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`flex bg-white p-6 rounded-md shadow-lg ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default Card;
