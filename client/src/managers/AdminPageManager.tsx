import { Navigate } from 'react-router-dom';
import Events from '../pages/userPages/Events';
import HomePage from '../pages/userPages/HomePage';

interface AdminPageManagerProperties {
    page: string;
}

const AdminPageManager = ({ page }: AdminPageManagerProperties) => {
    switch (page) {
        case 'home':
            return <HomePage userType="admin" />;

        case 'events':
            return <Events userType="admin" />;

        case 'register':
            return <p>register</p>;

        default:
            return <Navigate to="/home" replace />;
    }
};

export default AdminPageManager;
