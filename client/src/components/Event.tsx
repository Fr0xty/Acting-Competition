import { useEffect } from 'react';

interface EventProperties {
    userType: 'admin' | 'participant' | 'judge';
    eventId: string;
}

const Event = ({ userType, eventId }: EventProperties) => {
    useEffect(() => {
        (async () => {
            const getEventInfoReq = await fetch(`/api/resource/get-event?event-id=${eventId}`);
            console.log(await getEventInfoReq.json());
        })();
    }, [eventId]);

    return <div className="event">{eventId}</div>;
};

export default Event;
