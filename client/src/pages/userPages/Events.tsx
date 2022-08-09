import { useEffect, useState } from 'react';
import Event from '../../components/Event';
import EventAdd from '../../components/EventAdd';
import EventList from '../../components/EventList';
import UserNavbar from '../../components/UserNavbar';
import UserPageNavigation from '../../components/UserPageNavigation';

interface EventsProperties {
    userType: 'admin' | 'participant' | 'judge';
    eventId: string | undefined;
}

const Events = ({ userType, eventId }: EventsProperties) => {
    const [currentSubPage, setCurrentSubPage] = useState<'list' | 'add' | 'event'>('list');

    useEffect(() => {
        if (eventId) setCurrentSubPage('event');
    }, [eventId]);

    return (
        <div className="events">
            <UserNavbar />
            <UserPageNavigation userType={userType} currentPage="events" />
            {currentSubPage === 'list' && <EventList userType={userType} setCurrentSubPage={setCurrentSubPage} />}
            {currentSubPage === 'add' && <EventAdd setCurrentSubPage={setCurrentSubPage} />}
            {currentSubPage === 'event' && <Event userType={userType} eventId={eventId!} />}
        </div>
    );
};

export default Events;
