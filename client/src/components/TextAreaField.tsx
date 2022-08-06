import '../styles/TextAreaField.scss';

import { ChangeEvent, useState } from 'react';

interface TextAreaFieldProperties {
    fieldName: string;
    inputType?: 'text' | 'number' | 'password';
    characterLimit: number;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}

const TextAreaField = ({
    fieldName,
    inputType,
    characterLimit,
    value,
    setValue,
    className,
}: TextAreaFieldProperties) => {
    const [wordCount, setWordCount] = useState(value.length);

    const inputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const eValue = e.target.value;

        if (eValue.length > characterLimit) return;
        if (inputType === 'number' && !/^[0-9]*$/.test(eValue)) return;

        document.querySelector(`.text-area-field.${className}`)?.classList.remove('error');

        setWordCount(eValue.length);
        setValue(eValue);
    };

    return (
        <div className={`text-area-field input-field ${className}`}>
            <div className="description">
                <span className="input-name">{fieldName}</span>
                <span className="character-limit">
                    {wordCount} / {characterLimit}
                </span>
            </div>
            <textarea
                typeof={inputType === 'number' ? 'text' : inputType}
                maxLength={characterLimit}
                minLength={0}
                value={value}
                onChange={inputOnChange}
            />
        </div>
    );
};

export default TextAreaField;
