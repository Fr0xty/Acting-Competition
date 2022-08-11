import { Navigate } from 'react-router-dom';
import Events from '../pages/userPages/Events';
import HomePage from '../pages/userPages/HomePage';
import Item from '../pages/userPages/Item';
import Register from '../pages/userPages/Register';
import Users from '../pages/userPages/Users';

interface AdminPageManagerProperties {
    page: string;
    eventId: string | undefined;
}

const AdminPageManager = ({ page, eventId }: AdminPageManagerProperties) => {
    switch (page) {
        case 'home':
            return <HomePage userType="admin" />;

        case 'events':
            return <Events userType="admin" eventId={eventId} />;

        case 'register':
            return <Register />;

        case 'item':
            return <Item />;

        case 'users':
            return <Users />;

        default:
            return <Navigate to="/home" replace />;
    }
};

export default AdminPageManager;
