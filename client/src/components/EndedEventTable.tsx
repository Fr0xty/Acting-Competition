import '../styles/Table.scss';
import { useEffect, useState } from 'react';

interface EndedEventTableProperties {
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
}

const EndedEventTable = ({ userType, eventUsers }: EndedEventTableProperties) => {
    const [itemNames, setItemNames] = useState<string[]>([]);

    useEffect(() => {
        if (!eventUsers || !eventUsers.length) return;

        const tempItemNames: string[] = [];
        Object.keys(eventUsers[0])
            .filter(
                (key) =>
                    ![
                        'participant_id',
                        'name',
                        'phone_number',
                        'approved_admin_name',
                        'placement',
                        'total_marks',
                    ].includes(key)
            )
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
                        <td>Placement</td>
                        {userType !== 'participant' && <td>Participant Id</td>}
                        <td>Name</td>
                        {userType !== 'participant' && <td>Phone Number</td>}
                        {!!itemNames.length &&
                            itemNames.map((itemName, i) => {
                                return <td key={i}>{itemName}</td>;
                            })}
                        <td>Total Marks</td>
                    </tr>
                </thead>
                <tbody>
                    {eventUsers &&
                        eventUsers.map((user, i) => {
                            return (
                                <tr key={i} className={i % 2 ? 'dark' : 'light'}>
                                    <td
                                        className={
                                            user.placement === 1
                                                ? 'first'
                                                : user.placement === 2
                                                ? 'second'
                                                : user.placement === 3
                                                ? 'third'
                                                : ''
                                        }
                                    >
                                        {user.placement || 'Not Approved'}
                                    </td>

                                    {userType !== 'participant' && <td>{user.participant_id}</td>}
                                    <td>{user.name}</td>
                                    {userType !== 'participant' && <td>{user.phone_number}</td>}

                                    {itemNames.map((itemName, i) => {
                                        return <td key={i}>{user[itemName] || '-'}</td>;
                                    })}

                                    <td>{user.total_marks || 'Not Approved'}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default EndedEventTable;
