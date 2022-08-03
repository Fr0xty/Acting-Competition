import { Navigate } from 'react-router-dom';
import Events from '../pages/userPages/Events';
import HomePage from '../pages/userPages/HomePage';

interface ParticipantPageManagerProperties {
    page: string;
}

const ParticipantPageManager = ({ page }: ParticipantPageManagerProperties) => {
    switch (page) {
        case 'home':
            return <HomePage userType="participant" />;

        case 'events':
            return <Events userType="participant" />;

        default:
            return <Navigate to="/home" replace />;
    }
};

export default ParticipantPageManager;
