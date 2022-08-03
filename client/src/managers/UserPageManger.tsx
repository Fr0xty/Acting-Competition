import { Navigate } from 'react-router-dom';
import AdminPageManager from './AdminPageManager';
import JudgePageManager from './JudgePageManager';
import ParticipantPageManager from './ParticipantPageManager';

interface UserPageManagerProperties {
    userType: string;
    page: string;
}

const UserPageManager = ({ userType, page }: UserPageManagerProperties) => {
    switch (userType) {
        case 'admin':
            return <AdminPageManager page={page} />;

        case 'participant':
            return <ParticipantPageManager page={page} />;

        case 'judge':
            return <JudgePageManager page={page} />;

        case 'none':
            return <Navigate to="/" replace />;

        default:
            return <p>loading..</p>;
    }
};

export default UserPageManager;
