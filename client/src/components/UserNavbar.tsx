import '../styles/UserNavbar.scss';

import { useEffect, useState } from 'react';

const UserNavbar = () => {
    const [userInfo, setUserInfo] = useState({ name: 'loading..', userType: 'loading..' });

    useEffect(() => {
        (async () => {
            const userInfoReq = await fetch('/api/resource/@me');
            if (userInfoReq.status !== 200) return;

            setUserInfo(await userInfoReq.json());
        })();
    }, []);

    const logoutClicked = async () => {
        const confirm = window.confirm('Are you sure you want to log out?');
        if (!confirm) return;

        /**
         * want to logout
         */
        await fetch('/api/auth/reset-session', {
            method: 'post',
        });
        document.location.href = '/';
    };

    return (
        <div className="user-navbar">
            <div className="user">
                <h3>{userInfo.name}</h3>
                <p>{userInfo.userType}</p>
            </div>

            <button className="logout-btn no-select" onClick={logoutClicked}>
                Log Out
            </button>
        </div>
    );
};

export default UserNavbar;
