import '../styles/LoginSignupForm.scss';

import { useEffect, useState } from 'react';

import UserTypeSelect from './UserTypeSelect';
import InputField from './InputField';

const LoginForm = () => {
    const [userType, setUserType] = useState('participant');
    const [icNumber, setICNumber] = useState('');
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

    const submitLogin = async () => {
        const formData = {
            ic_number: icNumber,
            password: password,
        };

        const req = await fetch(`/api/auth/login?user-type=${userType}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(req.status);
    };

    return (
        <div className="login-form">
            <UserTypeSelect userType={userType} setUserType={setUserType} />

            <div className="form-body">
                <InputField
                    fieldName="IC Number"
                    characterLimit={12}
                    value={icNumber}
                    setValue={setICNumber}
                    inputType="number"
                />
                <InputField
                    fieldName="Password"
                    characterLimit={30}
                    value={password}
                    setValue={setPassword}
                    inputType={showPassword ? 'text' : 'password'}
                />

                <div
                    className={`show-password-btn no-select ${showPassword && 'selected'}`}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    Show Password
                </div>
                <div className="login-btn no-select" onClick={submitLogin}>
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
