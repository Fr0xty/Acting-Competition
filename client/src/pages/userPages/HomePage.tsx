import UserPageNavigation from '../../components/UserPageNavigation';
import UserNavbar from '../../components/UserNavbar';

interface HomePageProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const HomePage = ({ userType }: HomePageProperties) => {
    return (
        <div className="admin-home">
            <UserNavbar />
            {userType === 'admin' && <UserPageNavigation userType={userType} />}
        </div>
    );
};

export default HomePage;
