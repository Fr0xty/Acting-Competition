import '../styles/Navbar.scss';

import logo from '../assets/images/logo.png';
import { useEffect } from 'react';

interface NavbarProperties {
    currentPage?: 'home' | 'login' | 'signup';
}

const Navbar = ({ currentPage }: NavbarProperties) => {
    useEffect(() => {
        if (!currentPage) return;

        document.querySelector(`.navbar .right-side nav li.${currentPage}-nav`)?.classList.add('current-page');
    }, [currentPage]);
    return (
        <div className="navbar">
            <a href="/">
                <div className="left-side">
                    <img src={logo} alt="logo" />
                    <h1>Acting Competition</h1>
                </div>
            </a>

            <div className="right-side">
                <nav>
                    <ul>
                        <a href="/">
                            <li className="home-nav">Home</li>
                        </a>
                        <a href="/login">
                            <li className="login-nav">Login</li>
                        </a>
                        <a href="/signup">
                            <li className="signup-nav">Sign Up</li>
                        </a>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
