import '../styles/UserPageNavigation.scss';

interface UserPageNavigationProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const UserPageNavigation = ({ userType }: UserPageNavigationProperties) => {
    return (
        <div className="user-page-navigation">
            <a href="/events">
                <div className="btn">
                    <span>Events</span>
                </div>
            </a>
            {userType === 'admin' && (
                <a href="/register">
                    <div className="btn">
                        <span>Register</span>
                    </div>
                </a>
            )}
        </div>
    );
};

export default UserPageNavigation;
