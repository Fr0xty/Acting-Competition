import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

const Users = () => {
    return (
        <div className="users">
            <UserNavbar />
            <UserPageNavigation userType="admin" currentPage="users" />
        </div>
    );
};

export default Users;
