import '../styles/UserPageNavigation.scss';

interface UserPageNavigationProperties {
    userType: 'admin' | 'participant' | 'judge';
    currentPage?: 'events' | 'register';
}

const UserPageNavigation = ({ userType, currentPage }: UserPageNavigationProperties) => {
    return (
        <div className="user-page-navigation">
            <a href="/events">
                <div className={`btn ${currentPage === 'events' && 'current-page'}`}>
                    <span>Events</span>
                </div>
            </a>

            {userType === 'admin' && (
                <a href="/register">
                    <div className={`btn ${currentPage === 'register' && 'current-page'}`}>
                        <span>Register</span>
                    </div>
                </a>
            )}
        </div>
    );
};

export default UserPageNavigation;
