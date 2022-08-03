import { useEffect, useState } from 'react';
import UserHomeManger from '../managers/UserHomeManger';

const UserHome = () => {
    const [userType, setUserType] = useState('');

    useEffect(() => {
        (async () => {
            const req = await fetch('/api/resource/@me');
            console.log(req.status);

            if (req.status !== 200) return setUserType('none');
            setUserType((await req.json()).userType);
        })();
    }, []);

    return <UserHomeManger userType={userType} />;
};

export default UserHome;
