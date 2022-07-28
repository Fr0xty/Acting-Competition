import '../styles/SignupForm.scss';

import { useState } from 'react';

import UserTypeSelect from './UserTypeSelect';

const SignupForm = () => {
    const [userType, setUserType] = useState('participant');

    return (
        <div className="signup-form">
            <UserTypeSelect userType={userType} setUserType={setUserType} />{' '}
        </div>
    );
};

export default SignupForm;
