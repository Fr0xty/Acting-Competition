import '../styles/Table.scss';
import { useEffect, useState } from 'react';

interface OnGoingEventTableProperties {
    userType: 'admin' | 'participant' | 'judge';
    eventUsers:
        | {
              participant_id: string;
              name: string;
              phone_number: string;
              placement: string;
              total_marks: string;
          }[]
        | null
        | any[];
    eventId: string;
}

const OnGoingEventTable = ({ userType, eventUsers, eventId }: OnGoingEventTableProperties) => {
    const [itemNames, setItemNames] = useState<string[]>([]);

    const submitMarks = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const participantId = (e.target as HTMLButtonElement).classList[0].replace('--', '');
        const inputedValue = (
            document.querySelector(`.table table tbody tr td .edit-marks input.--${participantId}`) as HTMLInputElement
        ).value;

        const submitMarksReq = await fetch(`/api/resource/submit-marks?event-id=${eventId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                marks: inputedValue,
                participant_id: participantId,
            }),
        });

        if (submitMarksReq.status === 200) {
            alert('Submitted marks successfully.');
            return document.location.reload();
        }

        alert(await submitMarksReq.text());
    };

    const approveMarks = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const participantId = (e.target as HTMLButtonElement).classList[0].replace('--', '');

        const approveMarksReq = await fetch('/api/resource/approve-marks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: eventId.toString(),
                participant_id: participantId,
            }),
        });
        if (approveMarksReq.status === 400) return alert(await approveMarksReq.text());

        alert('Approved.');
        document.location.reload();
    };

    useEffect(() => {
        if (!eventUsers || !eventUsers.length) return;

        const tempItemNames: string[] = [];
        Object.keys(eventUsers[0])
            .filter((key) => !['participant_id', 'name', 'phone_number', 'approved_admin_name'].includes(key))
            .forEach((itemName) => {
                tempItemNames.push(itemName);
            });

        setItemNames(tempItemNames);
    }, [eventUsers]);

    return (
        <div className="table">
            <h2>Participants</h2>

            <table>
                <thead>
                    <tr>
                        {userType !== 'participant' && <td>Participant Id</td>}
                        <td>Name</td>
                        {userType !== 'participant' && <td>Phone Number</td>}
                        {
                            /* show all items */
                            userType !== 'participant' &&
                                !!itemNames.length &&
                                itemNames.map((itemName, i) => {
                                    return <td key={i}>{itemName}</td>;
                                })
                        }
                        {userType === 'admin' && <td>Approve</td>}
                    </tr>
                </thead>
                <tbody>
                    {eventUsers &&
                        eventUsers.map((user, i) => {
                            return (
                                <tr key={i} className={i % 2 ? 'dark' : 'light'}>
                                    {userType !== 'participant' && <td>{user.participant_id}</td>}
                                    <td>{user.name}</td>
                                    {userType !== 'participant' && <td>{user.phone_number}</td>}
                                    {
                                        /* show marks, if !marks, admin: -, judge set marks */
                                        userType !== 'participant' &&
                                            itemNames.map((itemName, i) => {
                                                return (
                                                    <td key={i}>
                                                        {user[itemName] ||
                                                            (userType === 'admin' ? (
                                                                '-'
                                                            ) : (
                                                                <div className="edit-marks">
                                                                    <input
                                                                        className={`--${user.participant_id}`}
                                                                        type="number"
                                                                        min={0}
                                                                    />
                                                                    <button
                                                                        className={`--${user.participant_id}`}
                                                                        onClick={submitMarks}
                                                                    >
                                                                        Give Marks
                                                                    </button>
                                                                </div>
                                                            ))}
                                                    </td>
                                                );
                                            })
                                    }
                                    {userType === 'admin' && (
                                        <td>
                                            {user.approved_admin_name || (
                                                <button className={`--${user.participant_id}`} onClick={approveMarks}>
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default OnGoingEventTable;
