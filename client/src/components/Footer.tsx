import '../styles/Footer.scss';

import twitterLogo from '../assets/images/twitter.svg';
import githubLogo from '../assets/images/github.png';
import phoneIcon from '../assets/images/phone_icon.png';
import emailIcon from '../assets/images/email_icon.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="info">
                <div className="phone">
                    <img className="phone-icon" src={phoneIcon} alt="phone icon" />
                    <span>123-456-7890</span>
                </div>
                <div className="email">
                    <img className="email-icon" src={emailIcon} alt="email icon" />
                    <span>support@actingcompetition.com</span>
                </div>
            </div>

            <div className="socials">
                <a href="https://example.com" target="_blank" rel="noreferrer">
                    <img src={twitterLogo} alt="twitter logo" />
                </a>

                <a href="https://github.com/Fr0xty/Acting-Competition" target="_blank" rel="noreferrer">
                    <img src={githubLogo} alt="twitter logo" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
