import UserNavbar from '../../components/UserNavbar';

interface EventsProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const Events = ({ userType }: EventsProperties) => {
    return (
        <div className="events">
            <UserNavbar />
        </div>
    );
};

export default Events;
