import '../styles/LoginSignupForm.scss';

import { useEffect, useState } from 'react';

import UserTypeSelect from './UserTypeSelect';
import InputField from './InputField';

const SignupForm = () => {
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
        const formInputs = document.querySelectorAll('.signup-form .form-body .input-field input, textarea');

        formInputs.forEach((input) => {
            input.addEventListener('focus', (e) => {
                (e.target as HTMLElement).parentElement?.classList.add('focused');
            });
            input.addEventListener('focusout', (e) => {
                (e.target as HTMLElement).parentElement?.classList.remove('focused');
            });
        });
    }, []);

    const submitSignup = async () => {
        const formData = {
            name,
            ic_number: icNumber,
            phone_number: phoneNumber,
            password,
        };

        const req = await fetch(`/api/auth/signup?user-type=${userType}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(await req.json());
    };

    return (
        <div className="signup-form">
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
                    className={`show-password-btn no-select ${showPassword && 'selected'}`}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    Show Password
                </div>
                <div className="signup-btn no-select" onClick={submitSignup}>
                    Sign Up
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
