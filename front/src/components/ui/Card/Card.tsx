import { FC, ReactNode } from 'react';
import * as classNames from 'classnames';

interface Props {
    children?: ReactNode;
    title?: ReactNode;
    footer?: ReactNode;
    flexChildren?: boolean;
}

const Card: FC<Props> = ({ children, title, footer, flexChildren }) => {
    return (
        <div
            className={
                'flex flex-col rounded-lg bold bg-gray-700 border-slate-600 border-1 shadow shadow-slate-800-lg highlight-white'
            }
        >
            {title && (
                <div
                    className={
                        'rounded-t-lg bg-gray-600 p-2 font-semibold border-b-1 border-slate-400 highlight-white'
                    }
                >
                    {title}
                </div>
            )}
            <div
                className={classNames('p-2', {
                    'rounded-t-lg highlight-white': !title,
                    'flex flex-col gap-2': flexChildren,
                })}
            >
                {children}
            </div>
            {footer && (
                <div
                    className={'rounded-b-lg bg-gray-00 p-2 border-b-1 border-slate-400'}
                >
                    {title}
                </div>
            )}
        </div>
    );
};

export default Card;
