import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

interface EventsProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const Events = ({ userType }: EventsProperties) => {
    return (
        <div className="events">
            <UserNavbar />
            <UserPageNavigation userType={userType} currentPage="events" />
        </div>
    );
};

export default Events;
