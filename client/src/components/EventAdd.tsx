import '../styles/EventAdd.scss';

import arrowLeftIcon from '../assets/images/arrow_left.svg';
import InputField from './InputField';
import { useEffect, useState } from 'react';
import TextAreaField from './TextAreaField';

interface EventAddProperties {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<'list' | 'add' | 'event'>>;
}

const EventAdd = ({ setCurrentSubPage }: EventAddProperties) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [registerDeadline, setRegisterDeadline] = useState('');
    const [eventDeadline, setEventDeadline] = useState('');

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

    const submitForm = async () => {
        const data = {
            name,
            description,
            register_deadline: registerDeadline,
            event_deadline: eventDeadline,
        };

        const submitReq = await fetch('/api/resource/add-event', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        /**
         * handle bad input
         */
        if (submitReq.status === 400) return alert(await submitReq.text());

        /**
         * unforeseen error
         */
        if (submitReq.status !== 200) return;

        /**
         * success
         */
        alert('Event created successfully.');
        document.location.href = '/events';
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
                    <button onClick={submitForm}>Create</button>
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

                    <div className="deadline-field">
                        <span>Register Deadline</span>
                        <input
                            type="date"
                            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                            onChange={(e) => {
                                setRegisterDeadline(e.target.value);
                            }}
                        />
                    </div>

                    <div className="deadline-field">
                        <span>Event Deadline</span>
                        <input
                            type="date"
                            min={
                                registerDeadline.length
                                    ? new Date(new Date().setDate(new Date(registerDeadline).getDate() + 1))
                                          .toISOString()
                                          .split('T')[0]
                                    : ''
                            }
                            onChange={(e) => {
                                setEventDeadline(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventAdd;
