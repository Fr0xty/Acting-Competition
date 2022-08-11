import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

const Item = () => {
    return (
        <div className="item">
            <UserNavbar />
            <UserPageNavigation userType="admin" currentPage="item" />
        </div>
    );
};

export default Item;
