import '../styles/UserPageNavigation.scss';

interface UserPageNavigationProperties {
    userType: 'admin' | 'participant' | 'judge';
    currentPage: 'home' | 'events' | 'register' | 'item' | 'users';
}

const UserPageNavigation = ({ userType, currentPage }: UserPageNavigationProperties) => {
    return (
        <div className="user-page-navigation">
            <a href="/home">
                <div className={`btn ${currentPage === 'home' && 'current-page'}`}>
                    <span>Home</span>
                </div>
            </a>

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

            {userType === 'admin' && (
                <a href="/item">
                    <div className={`btn ${currentPage === 'item' && 'current-page'}`}>
                        <span>Item</span>
                    </div>
                </a>
            )}
            {userType === 'admin' && (
                <a href="/users">
                    <div className={`btn ${currentPage === 'users' && 'current-page'}`}>
                        <span>Users</span>
                    </div>
                </a>
            )}
        </div>
    );
};

export default UserPageNavigation;
