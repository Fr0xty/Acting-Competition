import '../styles/InputField.scss';

import { useState } from 'react';

interface InputFieldProperties {
    fieldName: string;
    inputType?: 'text' | 'number' | 'password';
    characterLimit: number;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ fieldName, inputType, characterLimit, value, setValue }: InputFieldProperties) => {
    const [wordCount, setWordCount] = useState(value.length);

    return (
        <div className="input-field">
            <div className="description">
                <span className="input-name">{fieldName}</span>
                <span className="character-limit">
                    {wordCount} / {characterLimit}
                </span>
            </div>
            <input
                type={inputType || 'text'}
                maxLength={characterLimit}
                onChange={(e) => {
                    if (e.target.value.length > characterLimit) return;
                    setWordCount(e.target.value.length);
                    setValue(e.target.value);
                }}
                value={value}
            />
        </div>
    );
};

export default InputField;
