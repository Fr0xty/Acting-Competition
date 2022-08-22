import '../../styles/HomePage.scss';

import UserPageNavigation from '../../components/UserPageNavigation';
import UserNavbar from '../../components/UserNavbar';

interface HomePageProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const HomePage = ({ userType }: HomePageProperties) => {
    return (
        <div className="home-page">
            <UserNavbar />
            <UserPageNavigation userType={userType} currentPage="home" />

            <div className="home-page-welcome-text">
                {userType === 'admin' && (
                    <>
                        <h1>You're an Admin!</h1>
                        <p>Your job is to manage events, items, accounts and approve marks given by the judges.</p>
                    </>
                )}
                {userType === 'participant' && (
                    <>
                        <h1>You're a Participant!</h1>
                        <p>You can join events and view marks given by the judges.</p>
                    </>
                )}
                {userType === 'judge' && (
                    <>
                        <h1>You're a Judge!</h1>
                        <p>Your job is to give marks for your assigned items.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
