import '../styles/EventList.scss';

import { useEffect, useState } from 'react';

import addIcon from '../assets/images/add.svg';

interface EventListProperties {
    userType: 'admin' | 'participant' | 'judge';
    setCurrentSubPage: React.Dispatch<React.SetStateAction<'list' | 'add'>>;
}

const EventList = ({ userType, setCurrentSubPage }: EventListProperties) => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const fetchEventsReq = await fetch('/api/resource/get-events');
            if (fetchEventsReq.status !== 200) return;

            setEvents(await fetchEventsReq.json());
        })();
    }, []);

    return (
        <div className="event-list">
            {events.map((event) => (
                <div className="selection">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                </div>
            ))}

            <div
                className="add-event selection"
                onClick={() => {
                    setCurrentSubPage('add');
                }}
            >
                <img src={addIcon} alt="add icon" />
            </div>
        </div>
    );
};

export default EventList;
