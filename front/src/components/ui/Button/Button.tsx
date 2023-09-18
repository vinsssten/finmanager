import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const Button: FC<Props> = ({ children }) => {
    return (
        <button className={'p-1 bg-blue-500 rounded-md font-bold focus:ring-2'}>
            {children}
        </button>
    );
};
