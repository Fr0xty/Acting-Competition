import { useState } from 'react';
import EventAdd from '../../components/EventAdd';
import EventList from '../../components/EventList';
import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

interface EventsProperties {
    userType: 'admin' | 'participant' | 'judge';
}

const Events = ({ userType }: EventsProperties) => {
    const [currentSubPage, setCurrentSubPage] = useState<'list' | 'add'>('list');

    return (
        <div className="events">
            <UserNavbar />
            <UserPageNavigation userType={userType} currentPage="events" />
            {currentSubPage === 'list' && <EventList userType={userType} setCurrentSubPage={setCurrentSubPage} />}
            {currentSubPage === 'add' && <EventAdd setCurrentSubPage={setCurrentSubPage} />}
        </div>
    );
};

export default Events;
