import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;

    submit?: boolean,
    onClick?: () => void;
}

export const Button: FC<Props> = ({ children, ...restProps }) => {
    return (
        <button
            className={'p-1 bg-blue-500 rounded-md font-bold focus:ring-2'}
            {...restProps}
        >
            {children}
        </button>
    );
};
