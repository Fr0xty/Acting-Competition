import { Navigate } from 'react-router-dom';
import Events from '../pages/userPages/Events';
import HomePage from '../pages/userPages/HomePage';

interface JudgePageManagerProperties {
    page: string;
}

const JudgePageManager = ({ page }: JudgePageManagerProperties) => {
    switch (page) {
        case 'home':
            return <HomePage userType="judge" />;

        case 'events':
            return <Events userType="judge" />;

        default:
            return <Navigate to="/home" replace />;
    }
};

export default JudgePageManager;
