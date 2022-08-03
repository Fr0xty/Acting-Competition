import { Navigate } from 'react-router-dom';
import AdminHome from '../components/AdminHome';
import JudgeHome from '../components/JudgeHome';
import ParticipantHome from '../components/ParticipantHome';

interface UserHomeMangerProperties {
    userType: string;
}

const UserHomeManger = ({ userType }: UserHomeMangerProperties) => {
    switch (userType) {
        case 'admin':
            return <AdminHome />;

        case 'participant':
            return <ParticipantHome />;

        case 'judge':
            return <JudgeHome />;

        case 'none':
            return <Navigate to="/" replace />;

        default:
            return <p>loading..</p>;
    }
};

export default UserHomeManger;
