import { useEffect, useState } from 'react';
import EventDetails from './EventDetails';

interface EventProperties {
    userType: 'admin' | 'participant' | 'judge';
    eventId: string;
}

const Event = ({ userType, eventId }: EventProperties) => {
    const [eventStatus, setEventStatus] = useState<null | 'starting' | 'ongoing' | 'ended'>(null);
    const [eventData, setEventData] = useState<{ eventDetail: any; eventUsers: any[] | null }>({
        eventDetail: null,
        eventUsers: null,
    });

    /**
     * calculate current event status
     */
    const processEventStatus = () => {
        if (!eventData.eventDetail) return;
        const { register_deadline: registerDeadline, event_deadline: eventDeadline } = eventData.eventDetail;

        if (new Date(eventDeadline) < new Date()) return setEventStatus('ended');
        if (new Date(registerDeadline) < new Date()) return setEventStatus('ongoing');
        setEventStatus('starting');
    };

    /**
     * fetch event data and process
     */
    useEffect(() => {
        (async () => {
            const getEventInfoReq = await fetch(`/api/resource/get-event?event-id=${eventId}`);
            if (getEventInfoReq.status !== 200) return;

            setEventData(await getEventInfoReq.json());
            processEventStatus();
        })();
    }, [eventId]);

    return (
        <div className="event">
            <EventDetails eventStatus={eventStatus} eventDetail={eventData.eventDetail} />
        </div>
    );
};

export default Event;
