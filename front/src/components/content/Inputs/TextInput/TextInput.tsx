import { FC } from 'react';

type HTMLInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

interface TextInput extends HTMLInputProps {}

const TextInput: FC<TextInput> = ({ ...props }) => {
    return (
        <input
            className={
                'input p-2 bg-gray-500 border-slate-600 border-1 rounded-md highlight-white focus:ring-2 outline-none'
            }
            placeholder={'Input'}
            {...props}
        />
    );
};

export default TextInput;
