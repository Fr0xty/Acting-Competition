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

    return (
        <div className="user-navbar">
            <div className="user">
                <h3>{userInfo.name}</h3>
                <p>{userInfo.userType}</p>
            </div>

            <button className="logout-btn no-select">Log Out</button>
        </div>
    );
};

export default UserNavbar;
