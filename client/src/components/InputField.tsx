import '../styles/InputField.scss';

import { ChangeEvent, useState } from 'react';

interface InputFieldProperties {
    fieldName: string;
    inputType?: 'text' | 'number' | 'password';
    characterLimit: number;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ fieldName, inputType, characterLimit, value, setValue }: InputFieldProperties) => {
    const [wordCount, setWordCount] = useState(value.length);

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const eValue = e.target.value;

        if (eValue.length > characterLimit) return;
        if (inputType === 'number' && !/^[0-9]*$/.test(eValue)) return;

        setWordCount(eValue.length);
        setValue(eValue);
    };

    return (
        <div className="input-field">
            <div className="description">
                <span className="input-name">{fieldName}</span>
                <span className="character-limit">
                    {wordCount} / {characterLimit}
                </span>
            </div>
            <input
                type={inputType === 'number' ? 'text' : inputType}
                maxLength={characterLimit}
                onChange={inputOnChange}
                value={value}
                min={0}
            />
        </div>
    );
};

export default InputField;
