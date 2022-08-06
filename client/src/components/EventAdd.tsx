import '../styles/EventAdd.scss';

import arrowLeftIcon from '../assets/images/arrow_left.svg';
import InputField from './InputField';
import { useEffect, useState } from 'react';
import TextAreaField from './TextAreaField';

interface EventAddProperties {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<'list' | 'add'>>;
}

const EventAdd = ({ setCurrentSubPage }: EventAddProperties) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        /**
         * for focus styling
         */
        const formInputs = document.querySelectorAll('.event-add .form .form-body .input-field input, textarea');

        formInputs.forEach((input) => {
            input.addEventListener('focus', (e) => {
                (e.target as HTMLElement).parentElement?.classList.add('focused');
            });
            input.addEventListener('focusout', (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('focused');
            });
        });
    }, []);

    /**
     * to set the error styling on the input field
     * @param fieldClassName className of the input field element
     */
    const setFieldError = (fieldClassName: string) => {
        document.querySelector(`.input-field.${fieldClassName}`)?.classList.add('error');
    };

    return (
        <div className="event-add">
            <div className="form">
                <div className="form-header">
                    <div className="left-group">
                        <img
                            src={arrowLeftIcon}
                            alt="back"
                            onClick={() => {
                                setCurrentSubPage('list');
                            }}
                        />
                        <h1>Create Event</h1>
                    </div>
                    <button>Create</button>
                </div>
                <div className="form-body">
                    <InputField
                        characterLimit={30}
                        fieldName="Name"
                        setValue={setName}
                        value={name}
                        className="name-field"
                    />

                    <TextAreaField
                        characterLimit={1000}
                        fieldName="Description"
                        setValue={setDescription}
                        value={description}
                        className="description-field"
                    />
                </div>
            </div>
        </div>
    );
};

export default EventAdd;
