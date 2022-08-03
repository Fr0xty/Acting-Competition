import '../styles/AdminNavigation.scss';

const AdminNavigation = () => {
    return (
        <div className="admin-navigation">
            <a href="/home/events">
                <div className="btn">
                    <span>Events</span>
                </div>
            </a>
            <a href="/home/register">
                <div className="btn">
                    <span>Register</span>
                </div>
            </a>
        </div>
    );
};

export default AdminNavigation;
