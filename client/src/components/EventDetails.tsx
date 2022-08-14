import { useState } from 'react';
import '../styles/EventDetails.scss';

interface EventDetailsProperties {
    eventDetail: {
        description: string;
        event_deadline: string;
        event_id: string;
        name: string;
        register_deadline: string;
    } | null;

    eventStatus: null | 'starting' | 'ongoing' | 'ended';
}

const EventDetails = ({ eventDetail, eventStatus }: EventDetailsProperties) => {
    return (
        <div className="event-details">
            {eventDetail === null && <p>loading..</p>}

            {eventDetail && (
                <>
                    <h2>{eventDetail.name}</h2>
                    <p>{eventDetail.description}</p>

                    <div className="dates">
                        <span className="register">
                            Register Deadline:
                            <span className={`date ${eventStatus === 'starting' ? 'success' : 'danger'}`}>
                                {eventDetail.register_deadline}
                            </span>
                        </span>
                        <span className="event">
                            Event Ending:
                            <span
                                className={`date ${
                                    eventStatus !== 'starting' ? (eventStatus === 'ongoing' ? 'success' : 'danger') : ''
                                }`}
                            >
                                {eventDetail.event_deadline}
                            </span>
                        </span>
                    </div>

                    <button
                        disabled={eventStatus !== 'starting'}
                        onClick={() => {
                            document.location.href = `/item?event-id=${eventDetail.event_id}`;
                        }}
                    >
                        Edit Items
                    </button>
                </>
            )}
        </div>
    );
};

export default EventDetails;
