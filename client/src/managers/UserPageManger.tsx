import { Navigate } from 'react-router-dom';
import AdminPageManager from './AdminPageManager';
import JudgePageManager from './JudgePageManager';
import ParticipantPageManager from './ParticipantPageManager';

interface UserPageManagerProperties {
    userType: string;
    page: string;
    eventId: string | undefined;
}

const UserPageManager = ({ userType, page, eventId }: UserPageManagerProperties) => {
    switch (userType) {
        case 'admin':
            return <AdminPageManager page={page} eventId={eventId} />;

        case 'participant':
            return <ParticipantPageManager page={page} eventId={eventId} />;

        case 'judge':
            return <JudgePageManager page={page} eventId={eventId} />;

        case 'none':
            return <Navigate to="/" replace />;

        default:
            return <p>loading..</p>;
    }
};

export default UserPageManager;
