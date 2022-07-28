import '../styles/LoginForm.scss';

import { useState } from 'react';

import UserTypeSelect from './UserTypeSelect';

const LoginForm = () => {
    const [userType, setUserType] = useState('participant');

    return (
        <div className="login-form">
            <UserTypeSelect userType={userType} setUserType={setUserType} />
        </div>
    );
};

export default LoginForm;
