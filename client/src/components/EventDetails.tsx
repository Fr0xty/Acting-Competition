import '../styles/EventDetails.scss';

interface EventDetailsProperties {
    userType: 'admin' | 'participant' | 'judge';

    eventDetail: {
        description: string;
        event_deadline: string;
        event_id: string;
        name: string;
        register_deadline: string;
    } | null;

    eventStatus: null | 'starting' | 'ongoing' | 'ended';
}

const EventDetails = ({ userType, eventDetail, eventStatus }: EventDetailsProperties) => {
    const editItemsClicked = () => {
        document.location.href = `/item?event-id=${eventDetail?.event_id}`;
    };

    const deleteEventClicked = async () => {
        /**
         * confirm prompt
         */
        const confirm = window.confirm(
            'Are you sure you want to delete this event with its items, participants, and marks'
        );
        if (!confirm) return;

        /**
         * make the delete request
         */
        const deleteEventReq = await fetch(`/api/resource/delete-event?event-id=${eventDetail?.event_id}`, {
            method: 'delete',
        });

        if (deleteEventReq.status !== 200) return;
        alert('Event deleted successfully.');
        document.location.href = '/events';
    };

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

                    {userType === 'admin' && (
                        <div className="buttons no-print">
                            <button
                                className="edit-items-btn"
                                disabled={eventStatus !== 'starting'}
                                onClick={editItemsClicked}
                            >
                                Edit Items
                            </button>
                            <button className="delete-event-btn" onClick={deleteEventClicked}>
                                Delete Event
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventDetails;
