import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <div className="signup">
            <Navbar currentPage="signup" />
            <SignupForm />
        </div>
    );
};

export default Signup;
