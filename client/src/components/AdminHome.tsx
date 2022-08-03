import AdminProductNav from './AdminNavigation';
import UserNavbar from './UserNavbar';

const AdminHome = () => {
    return (
        <div className="admin-home">
            <UserNavbar />
            <AdminProductNav />
        </div>
    );
};

export default AdminHome;
