import { useEffect } from 'react';

import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

const Signup = () => {
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
        <div className="signup">
            <Navbar currentPage="signup" />
            <SignupForm />
        </div>
    );
};

export default Signup;
