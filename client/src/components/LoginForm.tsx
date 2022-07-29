import '../styles/LoginForm.scss';

import { MouseEvent, useEffect, useState } from 'react';

import UserTypeSelect from './UserTypeSelect';
import InputField from './InputField';

const LoginForm = () => {
    const [userType, setUserType] = useState('participant');
    const [name, setName] = useState('');
    const [icNumber, setICNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        /**
         * for focus styling
         */
        const formInputs = document.querySelectorAll('.login-form .form-body .input-field input, textarea');

        formInputs.forEach((input) => {
            input.addEventListener('focus', (e) => {
                (e.target as HTMLElement).parentElement?.classList.add('focused');
            });
            input.addEventListener('focusout', (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('focused');
            });
        });
    }, []);

    return (
        <div className="login-form">
            <UserTypeSelect userType={userType} setUserType={setUserType} />

            <div className="form-body">
                <InputField fieldName="Name" characterLimit={30} value={name} setValue={setName} />
                <InputField
                    fieldName="IC Number"
                    characterLimit={12}
                    value={icNumber}
                    setValue={setICNumber}
                    inputType="number"
                />
                <InputField
                    fieldName="Phone Number"
                    characterLimit={15}
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                />
                <InputField
                    fieldName="Password"
                    characterLimit={30}
                    value={password}
                    setValue={setPassword}
                    inputType={showPassword ? 'text' : 'password'}
                />
                <div
                    className={`show-password no-select ${showPassword && 'selected'}`}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    Show Password
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
