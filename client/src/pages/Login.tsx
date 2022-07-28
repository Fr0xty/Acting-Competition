import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const Login = () => {
    return (
        <div className="login">
            <Navbar currentPage="login" />
            <LoginForm />
        </div>
    );
};

export default Login;
