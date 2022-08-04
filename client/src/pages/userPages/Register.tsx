import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

interface RegisterProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const Register = ({ userType }: RegisterProperties) => {
    return (
        <div className="register">
            <UserNavbar />
            <UserPageNavigation userType={userType} currentPage="register" />
        </div>
    );
};

export default Register;
