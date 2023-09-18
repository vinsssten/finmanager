import { FC } from 'react';

interface TextInput {}

const TextInput: FC<TextInput> = () => {
    return (
        <input
            className={
                'input p-2 bg-gray-500 border-slate-600 border-1 rounded-md highlight-white focus:ring-2 outline-none'
            }
            placeholder={'Input'}
        />
    );
};

export default TextInput;
