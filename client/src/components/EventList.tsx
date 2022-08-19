import '../styles/EventList.scss';

import { useEffect, useState } from 'react';

import addIcon from '../assets/images/add.svg';

interface EventListProperties {
    userType: 'admin' | 'participant' | 'judge';
    setCurrentSubPage: React.Dispatch<React.SetStateAction<'list' | 'add' | 'event'>>;
}

const EventList = ({ userType, setCurrentSubPage }: EventListProperties) => {
    const [events, setEvents] = useState<any[]>([]);

    const joinEventClicked = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const eventId = (e.target as HTMLButtonElement).id;

        await fetch(`/api/resource/join-event?event-id=${eventId}`, {
            method: 'post',
        });
        alert('Joined event.');
    };

    useEffect(() => {
        (async () => {
            const fetchEventsReq = await fetch('/api/resource/get-events');
            if (fetchEventsReq.status !== 200) return;

            setEvents(await fetchEventsReq.json());
        })();
    }, []);

    return (
        <div className="event-list">
            {!!events.length &&
                events.map((event, i) => {
                    /**
                     * set text & className based on status
                     */
                    let status: 'Ended' | 'On Going' | 'Starting';
                    let text, spanClassName;

                    switch (event.event_status) {
                        case 'ended':
                            status = 'Ended';
                            spanClassName = 'ended';
                            text = `Ended on ${new Date(event.event_deadline).toLocaleString('en-US', {
                                dateStyle: 'medium',
                            })}`;
                            break;

                        case 'ongoing':
                            status = 'On Going';
                            spanClassName = 'on-going';
                            text = `Ending on ${new Date(event.event_deadline).toLocaleString('en-US', {
                                dateStyle: 'medium',
                            })}`;
                            break;

                        case 'starting':
                            status = 'Starting';
                            spanClassName = 'starting';
                            text = `Starting on ${new Date(event.register_deadline).toLocaleString('en-US', {
                                dateStyle: 'medium',
                            })}`;
                            break;

                        default:
                            /**
                             * avoid typescript error
                             */
                            status = 'Ended';
                    }

                    return (
                        <a href={`/events/${event.event_id}`} key={i}>
                            <div className="selection">
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>

                                <div className={`metadata ${spanClassName}`}>
                                    <span className="status">{status}</span>
                                    <span className="text">{text}</span>
                                    {userType === 'participant' && status === 'Ended' && (
                                        <button className="ended" disabled>
                                            Ended
                                        </button>
                                    )}
                                    {userType === 'participant' && status !== 'Ended' && (
                                        <button
                                            className="not-ended"
                                            disabled={event.participant_id || status === 'On Going'}
                                            id={event.event_id}
                                            onClick={joinEventClicked}
                                        >
                                            {status === 'Starting' && (event.participant_id ? 'Joined' : 'Join')}
                                            {status === 'On Going' &&
                                                (event.participant_id ? 'Joined' : 'Registration Closed')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </a>
                    );
                })}

            {userType === 'admin' && (
                <div
                    className="add-event selection"
                    onClick={() => {
                        setCurrentSubPage('add');
                    }}
                >
                    <img src={addIcon} alt="add icon" />
                </div>
            )}
        </div>
    );
};

export default EventList;
