import { useEffect } from 'react';

import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const Login = () => {
    /**
     * redirect to /home if is logged in
     */
    useEffect(() => {
        (async () => {
            const req = await fetch('/api/resource/is-logged-in');
            if (req.status !== 200) return;

            if ((await req.text()) === 'true') document.location.href = '/home';
        })();
    }, []);

    return (
        <div className="login">
            <Navbar currentPage="login" />
            <LoginForm />
        </div>
    );
};

export default Login;
