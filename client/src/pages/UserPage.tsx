import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPageManager from '../managers/UserPageManger';

interface UserPageProperties {
    page: string;
}

const UserPage = ({ page }: UserPageProperties) => {
    const { eventId } = useParams();

    const [userType, setUserType] = useState('');

    useEffect(() => {
        (async () => {
            /**
             * know the user's account type
             */
            const req = await fetch('/api/resource/@me');

            /**
             * if not logged in, redirect in UserHomeManager
             */
            if (req.status !== 200) return setUserType('none');

            setUserType((await req.json()).userType);
        })();
    }, []);

    return <UserPageManager userType={userType} page={page} eventId={eventId} />;
};

export default UserPage;
