import SignupForm from '../../components/SignupForm';
import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

const Register = () => {
    return (
        <div className="register">
            <UserNavbar />
            <UserPageNavigation userType="admin" currentPage="register" />
            <SignupForm />
        </div>
    );
};

export default Register;
